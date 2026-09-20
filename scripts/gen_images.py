import os

OUT = "/home/claude/anofamig/src/assets/images"
os.makedirs(OUT, exist_ok=True)

# name -> (gradient start, gradient end, building silhouette style)
specs = {
    "hero-villa":        ("#2d3b45", "#5c7080", "villa"),
    "apartment-living":  ("#c9b79c", "#a8927a", "apartment"),
    "house-garden":      ("#7fa88a", "#5c8368", "house"),
    "loft-industrial":   ("#b0472e", "#8a3521", "loft"),
    "living-room-bright":("#d8cdb8", "#bfae90", "apartment"),
    "kitchen-luxury":    ("#3f4a52", "#26303a", "apartment"),
    "studio-paris":      ("#8a7360", "#6b5847", "studio"),
    "villa-alpes":       ("#4a6b52", "#2f4a36", "villa"),
    "duplex-lille":      ("#5a5147", "#3c352d", "duplex"),
}

def building_path(style):
    # simple flat silhouette shapes, viewBox 0 0 400 240, centered-ish
    if style == "villa":
        return '''
        <rect x="60" y="120" width="280" height="90" fill="rgba(255,255,255,0.12)"/>
        <polygon points="60,120 200,60 340,120" fill="rgba(255,255,255,0.18)"/>
        <rect x="110" y="150" width="40" height="60" fill="rgba(0,0,0,0.15)"/>
        <rect x="250" y="150" width="40" height="60" fill="rgba(0,0,0,0.15)"/>
        <rect x="180" y="140" width="40" height="30" fill="rgba(0,0,0,0.15)"/>
        '''
    if style == "apartment":
        return '''
        <rect x="90" y="50" width="220" height="170" fill="rgba(255,255,255,0.14)"/>
        <rect x="110" y="70" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="160" y="70" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="210" y="70" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="260" y="70" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="110" y="120" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="160" y="120" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="210" y="120" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="260" y="120" width="35" height="35" fill="rgba(0,0,0,0.15)"/>
        <rect x="175" y="170" width="50" height="50" fill="rgba(0,0,0,0.2)"/>
        '''
    if style == "house":
        return '''
        <polygon points="80,140 200,60 320,140" fill="rgba(255,255,255,0.18)"/>
        <rect x="90" y="140" width="220" height="75" fill="rgba(255,255,255,0.12)"/>
        <rect x="175" y="165" width="50" height="50" fill="rgba(0,0,0,0.2)"/>
        <rect x="110" y="160" width="30" height="30" fill="rgba(0,0,0,0.15)"/>
        <rect x="260" y="160" width="30" height="30" fill="rgba(0,0,0,0.15)"/>
        '''
    if style == "loft":
        return '''
        <rect x="70" y="70" width="260" height="145" fill="rgba(255,255,255,0.12)"/>
        <rect x="90" y="90" width="50" height="50" fill="rgba(0,0,0,0.18)"/>
        <rect x="150" y="90" width="50" height="50" fill="rgba(0,0,0,0.18)"/>
        <rect x="210" y="90" width="50" height="50" fill="rgba(0,0,0,0.18)"/>
        <rect x="270" y="90" width="40" height="50" fill="rgba(0,0,0,0.18)"/>
        <rect x="170" y="160" width="60" height="55" fill="rgba(0,0,0,0.22)"/>
        '''
    if style == "studio":
        return '''
        <rect x="100" y="60" width="200" height="155" fill="rgba(255,255,255,0.14)"/>
        <rect x="120" y="80" width="70" height="70" fill="rgba(0,0,0,0.16)"/>
        <rect x="210" y="80" width="70" height="70" fill="rgba(0,0,0,0.16)"/>
        <rect x="165" y="170" width="70" height="45" fill="rgba(0,0,0,0.2)"/>
        '''
    if style == "duplex":
        return '''
        <rect x="80" y="40" width="240" height="175" fill="rgba(255,255,255,0.12)"/>
        <line x1="80" y1="120" x2="320" y2="120" stroke="rgba(0,0,0,0.15)" stroke-width="4"/>
        <rect x="105" y="60" width="45" height="40" fill="rgba(0,0,0,0.16)"/>
        <rect x="250" y="60" width="45" height="40" fill="rgba(0,0,0,0.16)"/>
        <rect x="105" y="140" width="45" height="40" fill="rgba(0,0,0,0.16)"/>
        <rect x="250" y="140" width="45" height="40" fill="rgba(0,0,0,0.16)"/>
        <rect x="178" y="150" width="44" height="65" fill="rgba(0,0,0,0.22)"/>
        '''
    return ""

for name, (c1, c2, style) in specs.items():
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="{c1}"/>
      <stop offset="100%" stop-color="{c2}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="240" fill="url(#g)"/>
  {building_path(style)}
</svg>'''
    with open(os.path.join(OUT, f"{name}.svg"), "w") as f:
        f.write(svg)

print("done", os.listdir(OUT))
