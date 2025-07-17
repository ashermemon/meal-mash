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
      
      
      
        With your response, Follow this structure exactly, without any exceptions at all. Text in square brackets ([]) is for you to replace appropriately to form the recipe. 
        If you need to use a TIMER IN A STEP, use THIS FORMAT: "[timer length in minutes] minutes" and at the end of the step, simply put this after the period: {minutes}. ALWAYS PUT IT AT THE END OF THE STEP, ON A NEW LINE AFTER ALL OTHER WORDS, YOU MUST DO THIS!
        Don't approximate. Be exact and put just the number inside the curly brackets. For example, "Put the rice in the boiling water for 5 minutes, then remove. 
        {5}". 

        
        ALWAYS use a timer with greater than 0 minutes in it and always use whole numbers. ONLY USE A TIMER and USE CURLY BRACKETS IF IT IS NECCESSARY
      
        You must bold the recipe name and each step using "**" before and after the desired bold text.
      
        Use "«" at the beginning of each step/section and "»" at the end of the step/section as shown in the structure

      
        HERE IS THE STRUCTURE:
      
      
      «
      
      **[Recipe Name]**
      [total recipe time]
      
      
      
      Nutrition Facts:

      Protein: ↾[protein]↿g
      Fat: ⇨[fat]⇦g
      Carbs: ⇸[carbs]⇷g

       **Nutrition Chart:**
      »
      
      
      «
      **Ingredients:** (THIS MUST INCLUDE EVERYTHING USED IN THE RECIPE!)
 ${
   props.leftovers.length !== 0
     ? `      [Quantity of leftovers] [leftover name] - (YOU MUST USE AT LEAST ONE LEFTOVER)
      [etc..]`
     : ``
 } 

      
      
      [Quantity of ingredient] [ingredient name]
      [etc…]
      
      »
      


      «
      
      **Instructions:**

      **Step 1:**
      [ENTIRE TEXT of step 1]
      
      {timer} - OPTIONAL
      
      »



      «
      
      **Step 2:**
      [ENTIRE TEXT of step 2]
      
      {timer} - OPTIONAL
      
      »



      «
      
      [etc..]
      
      »


      
      «
      
      **Helpful Tips** - OPTIONAL
      
      - [Tip 1]
      
      - [Tip 2]
      
      - [etc..]
      
      
      **Enjoy your [Recipe Name]**
      
      »  

        IMPORTANT FINAL NOTE: WHEN USING THIS STRUCTURE, MAKE 100% SURE THAT THE TIMER CURLY BRACKETS COME AT THE VERY END OF THE STEP, AFTER ALL OTHER INSTRUCTIONS AND TEXT AND ON A BRAND NEW LINE: FOR INSTANCE:
      "
        Step 1: Place the noodles into the pot and cook for 12 minutes. Then remove them and serve!
      
        {12}
      "
      
      THE MOST IMPORTANT THING IS MAKING IT A CONSISTENT STRUCTURE - NO EXCEPTIONS AT ALL. FOLLOW THE STRUCTURE EXACTLY 
        `;
};
export default Prompt;
