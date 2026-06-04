

export default function generateConstraints() {
    const mealType: string[] = [
        "High-protein gym meal",
        "Comfort food",
        "Restaurant-quality",
        "Late-night craving",
        "Meal-prep friendly",
        "Budget-friendly",
        "Fancy date night",
        "Healthy and light",
        "Quick weeknight dinner",
        "Street-food inspired",
        "Small snack",
    ]

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
    ]

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


    return [mealType[Math.floor(Math.random() * mealType.length)], textures[Math.floor(Math.random() * textures.length)], methods[Math.floor(Math.random() * methods.length)]]




}