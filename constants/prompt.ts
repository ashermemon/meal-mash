type PromptProps = {
  ingredients: string[];
  leftovers: string[];
};

const Prompt = (props: PromptProps) => {
  return `Generate a delicious meal and realistic that must use these leftovers:
        ${props.leftovers}
        The user also has these following ingredients available (optional):
        ${props.ingredients}
      
      
        You don't have to use all the ingredients, but you must use all of the leftovers!
        Assume the user has access to basic ingredients like salt and oil, as well as pans, pots and other basic kitchen tools.
        Make the recipe genuinely serious and really tasty. Don't just put the ingredients together. If the user added an ingredient that wouldn't go well, just omit it!
      
      
      
      
        With your response, Follow this structure exactly, without any exceptions at all. Text in square brackets ([]) is for you to replace appropriately to form the recipe. 
        If you need to use a TIMER IN A STEP, use THIS FORMAT: "[timer length in minutes] minutes" and at the end of the step, simply put this after the period: {minutes}. ALWAYS PUT IT AT THE END OF THE STEP, ON A NEW LINE AFTER ALL OTHER WORDS, YOU MUST DO THIS!
        Don't approximate. Be exact and put just the number inside the curly brackets. For example, "Put the rice in the boiling water for 5 minutes, then remove. 
        {5}". 
        ALWAYS use a timer with greater than 0 minutes in it and always use whole numbers. ONLY USE A TIMER and USE CURLY BRACKETS IF IT IS NECCESSARY
      
        You must bold the recipe name and each step using "**" before and after the desired bold text.
      
        Use "«" at the beginning of each step/section and "»" at the end of the step/section as shown in the structure
      
        HERE IS THE STRUCTURE:
      
      
      «
      
      **[Recipe Name]:**
      [total recipe time]
      
      
      
      Nutrition Facts:
      Calories: [calories]
      Protein: [protein]
      Fat: [fat]
      Carbs: [carbs]
      »
      
      
      «
      **Ingredients:**
      
      
      [Quantity of leftovers] [leftover name]
      [etc..]
      
      
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
