type PromptProps = {
  ingredients: string[];
  leftovers: string[];
  isChecked: boolean;
};

const Prompt = (props: PromptProps) => {
  return `Generate a delicious meal and realistic that ${
    props.leftovers.length !== 0
      ? `must use these leftovers:
        ${
          props.leftovers
        } The user also has these following ingredients available         ${
          props.isChecked ? `(Optional)` : ``
        }:`
      : `uses the following ingredients the user has:`
  } 

        ${props.ingredients}
      
      
        You don't have to use all the ingredients ${
          props.leftovers.length !== 0
            ? `, but you must use all/most of the leftovers!`
            : ``
        }
        Assume the user has access to basic ingredients like salt and oil, as well as pans, pots and other basic kitchen tools.
        Make the recipe genuinely serious and really tasty. Don't just put the ingredients together. If the user added an ingredient that wouldn't go well, just omit it!
      
        ${
          props.isChecked
            ? `You are allowed to use ingredients other than those listed but try to use at least a few of the ones the user put. The first priority is taste though, so if you need to, add other ingredients`
            : `YOU ARE ONLY PERMITTED TO USE INGREDIENTS ${
                props.leftovers.length !== 0 ? `or LEFTOVERS` : ``
              } LISTED BY THE USER (and salt and basics like that)`
        }
      
      
      
        With your response, Follow this structure exactly, without any exceptions at all. Text in replace tags, <replace> before, and </replace>, is for you to replace appropriately to form the recipe. 
        If you need to use a TIMER IN A STEP, use THIS FORMAT: "<replace>timer length in minutes</replace> minutes" and at the end of the step, simply put this after the period: <timer>minutes</timer>. ALWAYS PUT IT AT THE END OF THE STEP, ON A NEW LINE AFTER ALL OTHER WORDS!
        Don't approximate. Be exact and put just the number inside the timer tag. For example, "Put the rice in the boiling water for 5 minutes, then remove.  **IMPORTANT, for content inside <replace></replace> tags, you should not output the <replace></replace> tags. Just the content inside!
        DO NOT SHOW THE REPLACE TAGS!!
        <timer>5</timer>". 

        
        ALWAYS use a timer with greater than 0 minutes in it and always use whole numbers. ONLY USE A TIMER IF NECCESSARY
      
        You must wrap the recipe name with "<title>" and "</title>"
        
        BOLD each step using "<bold>" before and "</bold> after the desired bold text.

        For the current heading (Ingredients, or Instructions or Helpful Tips) use "<head>" before and "</head> after. There must be a heading on every step.
      
        For the instructions heading, add a <line></line> after the heading, before the bolded step!

      

        Use "<step>" at the beginning of each step/section and "</step>" at the end of the step/section as shown in the structure

        Use the <checkbox> before and </checkbox> after as shown in the structure (<checkbox> before the line and </checkbox> after the line)


        For protein, fat and carbs, wrap in the appropiate tags as shown in the structure

        Use the <tip></tip> tag for the tips in the helpful tips section.

        HERE IS THE STRUCTURE:
      
      
      <step>
      <title><replace>Recipe Name</replace></title>

      <replace>total recipe time</replace>
      
      Nutrition Facts:

      Protein: <protein><replace>protein in grams</replace></protein>g
      Fat: <fat><replace>fat in grams</replace></fat>g
      Carbs: <carbs><replace>carbs in grams</replace></carbs>g

      <bold>Nutrition Chart:</bold>
      </step>
      
      
      <step>
      <head>Ingredients:</head> (HAS TO BE A HEADER)(THIS MUST INCLUDE EVERYTHING USED IN THE RECIPE!)


      Collect the following ingredients in the specified amounts. Check each one off as you gather it:
      ${
        props.leftovers.length !== 0
          ? `<checkbox><replace>Quantity </replace> <replace> leftover name </replace> </checkbox> - (YOU MUST USE AT LEAST ONE LEFTOVER)
          <replace>etc..</replace>`
          : ``
      } <checkbox><replace>Quantity </replace> <replace> ingredient name </replace> </checkbox>
       <replace>etc…</replace>
      
      </step>
      


      <step>
      <head>Instructions:</head> (HAS TO BE ON EVERY STEP of instruction)
      <line></line>
      <bold>Step 1:</bold>
      <replace>ENTIRE TEXT of step 1</replace>
      
      <timer>time in minutes</timer> - OPTIONAL
      
      </step>



      <step>
      <head>Instructions:</head> (HAS TO BE ON EVERY STEP of instruction)
      <line></line>
      <bold>Step 2:</bold>

      <replace>ENTIRE TEXT of step 2</replace>
      
      <timer>time in minutes</timer>  - OPTIONAL
      
      </step>



      <step>
      <replace>etc..</replace>
      
      </step>


      
      <step>
      <head>Helpful Tips</head> 
      <line></line>
      <tip><replace>Tip 1</replace></tip>
      
      <tip><replace>Tip 2</replace></tip>
      
      <tip><replace>etc..</replace></tip>
      <line></line>
      <bold>Enjoy your <replace>Recipe Name</replace></bold>
      
      </step>  

        IMPORTANT FINAL NOTE: WHEN USING THIS STRUCTURE, MAKE 100% SURE THAT THE TIMER COMES AT THE VERY END OF THE STEP, AFTER ALL OTHER INSTRUCTIONS AND TEXT AND ON A BRAND NEW LINE: FOR INSTANCE:
      "
        Step 1: Place the noodles into the pot and cook for 12 minutes. Then remove them and serve!
      
        <timer>12</timer>
      "
      
      THE MOST IMPORTANT THING IS MAKING IT A CONSISTENT STRUCTURE - NO EXCEPTIONS AT ALL. FOLLOW THE STRUCTURE EXACTLY 
      HERE IS AN EXAMPLE FOLLOWING THE STRUCTURE:
      <step>
<title>Salmon & Beef Spinach Salad with Ranch Dressing</title>

20 minutes

Nutrition Facts:

Protein: <protein>45</protein>g
Fat: <fat>30</fat>g
Carbs: <carbs>10</carbs>g

<bold>Nutrition Chart:</bold>
</step>

<step>
<head>Ingredients:</head>

Collect the following ingredients in the specified amounts. Check each one off as you gather it:
<checkbox>4 oz grilled salmon fillet </checkbox>
<checkbox>4 oz ground beef </checkbox>
<checkbox>5 oz spinach </checkbox>
<checkbox>1/2 cup ranch dressing </checkbox>
<checkbox>1/4 cup onion (sliced) </checkbox>
<checkbox>1 tomato (chopped) </checkbox>
<checkbox>1 tbsp olive oil </checkbox>
<checkbox>Salt to taste </checkbox>
<checkbox>Pepper to taste </checkbox>
<checkbox>Optional: Lettuce (for a milder base if spinach is too strong) </checkbox>

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 1:</bold>
Heat the olive oil in a skillet over medium heat. Add the sliced onion and cook until softened, about 3 minutes. <timer>3</timer>

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 2:</bold>
Add the ground beef to the skillet with the onions. Season with salt and pepper to taste. Cook until the beef is heated through, about 5 minutes, breaking it up with a spoon as it cooks. <timer>5</timer>

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 3:</bold>
While the beef is cooking, flake the grilled salmon fillet into bite-sized pieces. Set aside.

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 4:</bold>
In a large bowl, combine the spinach (and lettuce, if using) and chopped tomato.

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 5:</bold>
Add the cooked ground beef and onions to the salad bowl.

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 6:</bold>
Gently toss in the flaked salmon.

</step>

<step>
<head>Instructions:</head>
<line></line>
<bold>Step 7:</bold>
Drizzle the ranch dressing over the salad. Toss gently to coat.

</step>

<step>
<head>Helpful Tips</head>
<line></line>
<tip>If you prefer warm salmon, gently warm the salmon in the microwave for 30 seconds before adding to the salad</tip>
<tip>For a spicier kick, add a pinch of red pepper flakes to the ground beef while cooking</tip>
<tip>If you don't have sliced onion, onion powder works in a pinch</tip>
<tip>If you want to add more ingredients, croutons or shredded cheese will work well</tip>
<line></line>
<bold>Enjoy your Salmon & Beef Spinach Salad with Ranch Dressing</bold>

</step>




        `;
};
export default Prompt;
