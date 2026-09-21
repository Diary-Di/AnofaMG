import logo from "../assets/images/anofamg-logo.svg";

export default function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      className={className}
      alt="anofamg"
    />
  );
}
