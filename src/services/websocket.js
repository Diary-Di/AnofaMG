import { Client } from "@stomp/stompjs";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://my-asus.tail1da18b.ts.net/api";
const subscriptions = new Set();
let client;

function getWebSocketUrl() {
    const url = new URL(API_BASE_URL);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.pathname = url.pathname.replace(/\/api\/?$/, "/ws");
    return url.toString();
}

function subscribeAll() {
    if (!client?.connected) return;

    subscriptions.forEach((entry) => {
        if (entry.stompSubscription) return;

        entry.stompSubscription = client.subscribe("/topic/transactions", (message) => {
            try {
                entry.listener(JSON.parse(message.body));
            } catch (error) {
                console.error("Impossible de parser la notification WebSocket", error);
            }
        });
    });
}

function ensureClient() {
    if (client) return client;

    client = new Client({
        brokerURL: getWebSocketUrl(),
        reconnectDelay: 5000,
        onConnect: subscribeAll,
        onDisconnect: () => {
            subscriptions.forEach((entry) => {
                entry.stompSubscription = null;
            });
        },
        onStompError: (frame) => {
            console.error("Erreur STOMP", frame.headers["message"], frame.body);
        },
        onWebSocketError: (error) => {
            console.error("Erreur WebSocket", error);
        },
    });

    return client;
}

export function subscribeToTransactions(listener) {
    const entry = { listener, stompSubscription: null };
    const stompClient = ensureClient();
    subscriptions.add(entry);

    if (!stompClient.active) {
        stompClient.activate();
    } else {
        subscribeAll();
    }

    return () => {
        if (entry.stompSubscription) {
            entry.stompSubscription.unsubscribe();
        }
        subscriptions.delete(entry);

        if (subscriptions.size === 0 && client?.active) {
            client.deactivate();
        }
    };
}
