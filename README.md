# MealMash App - Created by Asher Memon

MealMash turns whatever's left in your fridge into your next meal. You keep track of what's in your pantry (leftovers included), and the app uses AI to generate quick, realistic recipes from the ingredients you already have. The goal is to save food from going to waste and save you time figuring out what to make. You can swipe through recipes, save the ones you like, and follow them step by step with built-in timers.

## Download

**[Get MealMash here!](https://linktr.ee/mealmash)**

## Features

- **Three ways to generate:** use only your pantry ingredients, pick specific ingredients to cook with, or let it use any ingredients
- **Swipe through recipes:** swipe right to save a recipe, swipe left to skip it
- **Customize what you get:** set difficulty, cook time, servings, meal type, cuisine and dietary restrictions
- **Surprise Me:** one tap and you get a completely random recipe
- **Pantry:** search a big ingredient database and add things to your pantry, including leftovers and prepared dishes (the AI knows not to recook those)
- **Follow Recipe mode:** ingredient checklist, nutrition breakdown (protein, fat and carbs), step-by-step instructions, cooking timers and helpful tips
- **Timer notifications:** if you leave the app while a timer is running, you'll still get notified when it's done, and tapping the notification takes you right back to that step
- **Saved recipes:** sorted into categories like Tasty Meals, Sweet Treats, Quick Snacks and Under 15 Minutes
- **Grocery list:** items get added to your pantry when you check them off, and you can uncheck everything to reuse your list
- **Browse by category:** scroll through lunch, dessert and other recipe ideas straight from the home page
- **Achievements:** 8 to unlock, like Leftover Legend, World Tour and Late-Night Snack
- **Profile:** profile picture, how many meals you've generated, and your achievements
- **Light and dark mode**
- **Privacy:** everything is stored on your device, and you can erase all your data anytime from the profile page

## Tech Stack

- **React Native + Expo** (Expo Router for navigation)
- **TypeScript**
- **Google Gemini** for recipe generation
- **Supabase** for the ingredient database and meal images
- **MMKV** for fast local storage
- **Reanimated + Gesture Handler** for the swiping and animations
- **Expo Notifications** for timers and reminders

## Running Locally

The app uses native modules (MMKV) so it needs a development build instead of ExpoGo.

```bash
cd client
npm install
npx expo run:ios     # or npx expo run:android
```

You also need a `.env` file in `client/` with your Gemini API key:

```
EXPO_PUBLIC_API_KEY=your_gemini_api_key
```

## Feedback

If you find a bug or have an idea for the app, leave it [here](https://forms.gle/Uxzrkfzvk7tFAFRW9)
