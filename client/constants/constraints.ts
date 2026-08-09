export default function generateConstraints() {
  const mealType: string[] = [
    "Cozy",
    "Fresh",
    "Indulgent",
    "Wholesome",
    "Comforting",
    "Fun",
    "Playful",
    "Rustic",
    "Elegant",
    "Casual",
    "Nostalgic",
    "Vibrant",
    "Relaxed",
    "Invigorating",
    "Satisfying",
    "Refreshing",
    "Hearty",
    "Light",
    "Festive",
    "Adventurous",
    "Familiar",
    "Creative",
    "Simple",
    "Luxurious",
    "Soul-warming",
  ];

  const textures: string[] = [
    "Crispy",
    "Crunchy",
    "Creamy",
    "Chewy",
    "Tender",
    "Juicy",
    "Flaky",
    "Sticky",
    "Velvety",
    "Charred",
  ];

  const methods: string[] = [
    "Air fryer",
    "Sheet pan roasted",
    "One-pot",
    "Grilled",
    "Stir-fried",
    "Slow-cooked",
    "Baked",
    "Pan-seared",
    "Steamed",
    "Smoked",
  ];

  const twists: string[] = [
    "Serve it as a bowl",
    "Make it handheld",
    "Make it shareable",
    "Layer it",
    "Stack it",
    "Serve it family-style",
    "Make it bite-sized",
    "Create a loaded version",
    "Create a wrap-style version",
    "Make it visually colorful",
  ];

  return [
    mealType[Math.floor(Math.random() * mealType.length)],
    textures[Math.floor(Math.random() * textures.length)],
    methods[Math.floor(Math.random() * methods.length)],
    twists[Math.floor(Math.random() * twists.length)],
  ];
}
