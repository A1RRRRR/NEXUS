const STORAGE_KEY_DRINKS = 'bev_community_drinks'
const STORAGE_KEY_REVIEWS = 'bev_reviews'
const STORAGE_KEY_LIKES = 'bev_likes'

export const SEED_COMMUNITY_DRINKS = [
  {
    id: 'c1',
    community: true,
    name: 'Mango Chilli Sour',
    category: 'cocktail',
    alcoholic: true,
    difficulty: 'Medium',
    time: '7 min',
    servings: 1,
    emoji: '🥭',
    gradient: 'linear-gradient(135deg, #4a2000 0%, #251000 100%)',
    description: 'A house special I developed over two years — sweet mango, fiery chilli tincture, and whiskey sour backbone. Guests always ask for the recipe.',
    creator: { name: 'Jordan K.', avatar: '👨‍🍳', joined: 'Jan 2025' },
    createdAt: '2026-03-12',
    likes: 342,
    rating: 4.8,
    ingredients: [
      { amount: '2 oz', item: 'Bourbon' },
      { amount: '1 oz', item: 'Fresh mango purée' },
      { amount: '¾ oz', item: 'Fresh lime juice' },
      { amount: '½ oz', item: 'Agave syrup' },
      { amount: '3 drops', item: 'Chilli tincture (or hot sauce)' },
      { amount: '1', item: 'Egg white' },
      { amount: 'Garnish', item: 'Dried chilli flake rim & mango slice' },
    ],
    steps: [
      { title: 'Rim the glass', desc: 'Mix chilli flakes and salt on a plate. Run a lime wedge around the rim, dip at an angle.' },
      { title: 'Dry shake', desc: 'Combine all ingredients (no ice). Shake hard for 20 seconds to emulsify the egg white.' },
      { title: 'Wet shake', desc: 'Add ice and shake again for 15 seconds until very cold.' },
      { title: 'Double strain', desc: 'Strain into a chilled coupe. The foam cap should be thick and glossy.' },
      { title: 'Garnish', desc: 'A thin mango slice fanned on the foam. Three drops of chilli tincture through the centre.' },
    ],
    tips: [
      'Freeze mango and blend from frozen — thicker purée, colder drink.',
      'Make your own chilli tincture: soak bird\'s eye chillies in high-proof vodka for 48 hours.',
      'Add a pinch of smoked salt to the dry shake for a deeper flavour.',
    ],
    barNote: 'The chilli tincture makes this drink — adjust drops to your crowd\'s heat tolerance.',
    reviews: [
      { id: 'r1', author: 'Priya M.', avatar: '👩', rating: 5, text: 'Made this for my book club. Absolute stunner — the chilli catches you at the back of every sip. Doubled the recipe for 8 people perfectly.', date: '2026-04-02' },
      { id: 'r2', author: 'Tom H.', avatar: '🧑', rating: 5, text: 'I swapped bourbon for mezcal. The smokiness with mango and chilli is next level. Highly recommend the variation.', date: '2026-04-18' },
      { id: 'r3', author: 'Amara O.', avatar: '👩‍🦱', rating: 4, text: 'Great recipe! I couldn\'t get chilli tincture so used a tiny drop of Tabasco — still excellent. Docking one star only because I want a video walkthrough!', date: '2026-05-01' },
    ],
  },
  {
    id: 'c2',
    community: true,
    name: 'Lavender Cloud',
    category: 'mocktail',
    alcoholic: false,
    difficulty: 'Easy',
    time: '5 min',
    servings: 1,
    emoji: '💜',
    gradient: 'linear-gradient(135deg, #2a0a4a 0%, #150525 100%)',
    description: 'Lavender honey, lemon, and sparkling water — served over a cloud of whipped cream. My daughter asks for this every Saturday morning.',
    creator: { name: 'Claire B.', avatar: '👩‍🦳', joined: 'Mar 2025' },
    createdAt: '2026-02-20',
    likes: 518,
    rating: 4.9,
    ingredients: [
      { amount: '1 oz', item: 'Lavender syrup (homemade or Monin)' },
      { amount: '¾ oz', item: 'Fresh lemon juice' },
      { amount: '1 tsp', item: 'Honey' },
      { amount: '4 oz', item: 'Sparkling water' },
      { amount: '2 tbsp', item: 'Double cream (whipped to soft peaks)' },
      { amount: 'Garnish', item: 'Dried lavender sprig & lemon wheel' },
    ],
    steps: [
      { title: 'Make lavender lemon base', desc: 'Stir together lavender syrup, lemon juice, and honey until the honey dissolves.' },
      { title: 'Ice', desc: 'Fill a tall glass with clear ice cubes.' },
      { title: 'Pour base', desc: 'Add the lavender lemon mixture over the ice.' },
      { title: 'Top with sparkling water', desc: 'Slowly pour sparkling water down the side of the glass.' },
      { title: 'Cloud top', desc: 'Float a spoonful of loosely whipped cream on top. It should sit on the surface like a cloud.' },
      { title: 'Garnish', desc: 'Add a dried lavender sprig pushed into the cream and a lemon wheel on the rim.' },
    ],
    tips: [
      'Homemade lavender syrup: simmer 1 cup sugar, 1 cup water, 2 tbsp dried lavender for 10 minutes. Strain and cool.',
      'The cream shouldn\'t be fully whipped — you want it to just hold, so it slowly dissolves into the drink.',
      'Add a drop of butterfly pea tea for a colour-shift effect when the lemon is added.',
    ],
    barNote: 'This got 2,000 saves on my Instagram. The purple-to-pink gradient as the cream dissolves is magic.',
    reviews: [
      { id: 'r4', author: 'Sophia G.', avatar: '👧', rating: 5, text: 'I served these at my brunch and literally everyone asked for the recipe. The cream cloud is genius — it melts in and changes the whole flavour as you drink.', date: '2026-03-08' },
      { id: 'r5', author: 'Nadia F.', avatar: '👩‍🦰', rating: 5, text: 'Finally a non-alcoholic drink that feels luxurious. I\'m making these for every gathering from now on.', date: '2026-03-22' },
      { id: 'r6', author: 'Kenji T.', avatar: '🧑‍🦱', rating: 5, text: 'I used coconut cream instead of double cream for a vegan version — still incredible. Claire is the GOAT.', date: '2026-04-11' },
    ],
  },
  {
    id: 'c3',
    community: true,
    name: 'Smoked Rosemary Gin',
    category: 'classic',
    alcoholic: true,
    difficulty: 'Hard',
    time: '12 min',
    servings: 1,
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #0a2a10 0%, #051508 100%)',
    description: 'I torch a rosemary sprig and trap the smoke in the glass before building the cocktail. The herbal smoke infuses everything. Restaurant quality, I promise.',
    creator: { name: 'Alex P.', avatar: '👨‍🦲', joined: 'Nov 2024' },
    createdAt: '2026-01-08',
    likes: 284,
    rating: 4.7,
    ingredients: [
      { amount: '2 oz', item: 'Hendricks or Tanqueray Sevilla gin' },
      { amount: '¾ oz', item: 'St-Germain elderflower liqueur' },
      { amount: '½ oz', item: 'Fresh lemon juice' },
      { amount: '¼ oz', item: 'Simple syrup' },
      { amount: '1', item: 'Fresh rosemary sprig (for smoking)' },
      { amount: 'Garnish', item: 'Charred rosemary sprig' },
    ],
    steps: [
      { title: 'Prep the smoke', desc: 'Hold a rosemary sprig with tongs and hold it directly in a flame for 5–8 seconds until it starts to smoke heavily. Don\'t let it fully combust.' },
      { title: 'Trap the smoke', desc: 'Immediately place the smoking rosemary inside your chilled rocks glass and cover with a small plate or another glass. Let it sit for 60 seconds.' },
      { title: 'Build the cocktail', desc: 'While the glass smokes, combine gin, St-Germain, lemon juice, and simple syrup in a shaker with ice. Shake for 15 seconds.' },
      { title: 'Release & strain', desc: 'Remove the plate and discard the rosemary. Quickly strain the cocktail into the smoke-infused glass over one large ice cube.' },
      { title: 'Garnish', desc: 'Briefly torch a fresh rosemary sprig, blow it out, and rest it on the rim.' },
    ],
    tips: [
      'The smoke dissipates fast — have your shaker ready before you torch the rosemary.',
      'Citrus peel smoke (lemon or orange) instead of rosemary gives a totally different but equally stunning result.',
      'A smoking gun makes this much easier and more controlled if you do it regularly.',
    ],
    barNote: 'The trick is speed — smoke the glass, shake the cocktail simultaneously, and strain in while the smoke is still visible.',
    reviews: [
      { id: 'r7', author: 'Fiona C.', avatar: '👩', rating: 5, text: 'Insane. The smell when you lift the plate is half the experience. Made this for New Year\'s Eve and it was the most impressive thing I\'ve ever served.', date: '2026-01-15' },
      { id: 'r8', author: 'Ben W.', avatar: '🧑', rating: 4, text: 'Harder than it looks on the first attempt but once you get the timing down it\'s spectacular. Worth the practice runs.', date: '2026-02-03' },
    ],
  },
  {
    id: 'c4',
    community: true,
    name: 'Hibiscus Paloma',
    category: 'cocktail',
    alcoholic: true,
    difficulty: 'Easy',
    time: '5 min',
    servings: 1,
    emoji: '🌺',
    gradient: 'linear-gradient(135deg, #4a0020 0%, #250010 100%)',
    description: 'A twist on the classic Paloma — hibiscus-infused tequila, grapefruit, and lime with a tajín rim. My most-requested recipe by far.',
    creator: { name: 'Rosa V.', avatar: '👩‍🦱', joined: 'Feb 2025' },
    createdAt: '2026-04-05',
    likes: 621,
    rating: 4.9,
    ingredients: [
      { amount: '2 oz', item: 'Hibiscus-infused tequila blanco (or plain)' },
      { amount: '2 oz', item: 'Fresh grapefruit juice' },
      { amount: '½ oz', item: 'Fresh lime juice' },
      { amount: '½ oz', item: 'Hibiscus syrup' },
      { amount: 'Top', item: 'Sparkling water' },
      { amount: 'Rim', item: 'Tajín & salt mix' },
      { amount: 'Garnish', item: 'Grapefruit wedge & dried hibiscus flower' },
    ],
    steps: [
      { title: 'Hibiscus tequila (make ahead)', desc: 'Add 2 tbsp dried hibiscus flowers to 750ml tequila. Steep for 2 hours at room temperature, then strain. Keeps for 3 months.' },
      { title: 'Tajín rim', desc: 'Mix 1:1 Tajín and sea salt. Rim a glass with grapefruit juice, then dip in the mix.' },
      { title: 'Combine', desc: 'Add tequila, grapefruit juice, lime juice, and hibiscus syrup to a shaker with ice.' },
      { title: 'Shake', desc: 'Shake for 12 seconds.' },
      { title: 'Build', desc: 'Fill rimmed glass with ice, strain the cocktail over it, and top with sparkling water.' },
      { title: 'Garnish', desc: 'Grapefruit wedge on the rim and a dried hibiscus flower floated on top.' },
    ],
    tips: [
      'Hibiscus syrup: simmer 1 cup water, 1 cup sugar, ¼ cup dried hibiscus flowers for 10 minutes. Strain and cool.',
      'The infused tequila turns a stunning deep red — it\'s the visual centrepiece.',
      'Use freshly squeezed ruby red grapefruit for the sweetest result.',
    ],
    barNote: 'Batch the hibiscus tequila and syrup on Sunday — weeknight Palomas in under 3 minutes.',
    reviews: [
      { id: 'r9', author: 'Marco L.', avatar: '🧑‍🦰', rating: 5, text: 'Rosa this is STUNNING. I made a batch for Cinco de Mayo (20 servings). The hibiscus tequila alone is worth it.', date: '2026-05-06' },
      { id: 'r10', author: 'Dana K.', avatar: '👩', rating: 5, text: 'Made it without the hibiscus infusion (just plain tequila + extra syrup) on a weeknight and it was still incredible.', date: '2026-05-14' },
      { id: 'r11', author: 'Sam J.', avatar: '🧑', rating: 5, text: 'The Tajín rim is such a good call. I\'m now putting Tajín on everything.', date: '2026-05-20' },
    ],
  },
  {
    id: 'c5',
    community: true,
    name: 'Cold Brew Espresso Tonic',
    category: 'mocktail',
    alcoholic: false,
    difficulty: 'Easy',
    time: '4 min',
    servings: 1,
    emoji: '☕',
    gradient: 'linear-gradient(135deg, #1a0f00 0%, #0d0700 100%)',
    description: 'The coffee shop drink I make at home every morning. Cold brew, tonic water, and a touch of orange — bittersweet, caffeinated, and endlessly refreshing.',
    creator: { name: 'Felix O.', avatar: '👨', joined: 'Apr 2025' },
    createdAt: '2026-05-11',
    likes: 443,
    rating: 4.8,
    ingredients: [
      { amount: '2 oz', item: 'Cold brew concentrate' },
      { amount: '4 oz', item: 'Tonic water (Fever-Tree Indian or light)' },
      { amount: '2', item: 'Orange peel strips' },
      { amount: '1 tsp', item: 'Vanilla syrup (optional)' },
      { amount: 'Garnish', item: 'Orange wheel & coffee bean' },
    ],
    steps: [
      { title: 'Chill everything', desc: 'Your cold brew and tonic water both need to be fridge-cold. This prevents over-dilution.' },
      { title: 'Express the orange', desc: 'Squeeze two strips of orange peel over a tall glass to coat the inside with citrus oils.' },
      { title: 'Ice', desc: 'Fill with large clear ice cubes.' },
      { title: 'Add cold brew', desc: 'Pour the cold brew concentrate over the ice.' },
      { title: 'Top with tonic', desc: 'Slowly pour tonic water over the back of a spoon to preserve the carbonation and create a gradient.' },
      { title: 'Garnish', desc: 'Add an orange wheel and float 3 coffee beans on the foam.' },
    ],
    tips: [
      'Make cold brew at home: coarse grounds + cold water (1:8 ratio), steep in fridge for 18 hours, strain.',
      'Don\'t stir — the gradient from dark coffee at the bottom to light tonic on top is the whole aesthetic.',
      'Add a salted caramel syrup drop instead of vanilla for an autumn version.',
    ],
    barNote: 'The tonic bitterness and cold brew bitterness work together, not against each other — it\'s the quinine that does it.',
    reviews: [
      { id: 'r12', author: 'Yuki N.', avatar: '👩‍🦱', rating: 5, text: 'I\'ve been making this every morning for 3 weeks. Changed my life. Far better than anything the coffee shop makes.', date: '2026-05-18' },
      { id: 'r13', author: 'Chris R.', avatar: '🧑‍🦰', rating: 4, text: 'Great recipe. I found Fever-Tree Elderflower tonic pairs even better than the Indian tonic — try it!', date: '2026-05-25' },
    ],
  },
  {
    id: 'c6',
    community: true,
    name: 'Blackberry Bramble Fizz',
    category: 'cocktail',
    alcoholic: true,
    difficulty: 'Medium',
    time: '8 min',
    servings: 1,
    emoji: '🫐',
    gradient: 'linear-gradient(135deg, #1a0030 0%, #0d0018 100%)',
    description: 'Fresh muddled blackberries, gin, lemon, and crème de mûre. I grew up picking blackberries and this drink is everything I love about them in a glass.',
    creator: { name: 'Harriet B.', avatar: '👩‍🦳', joined: 'Aug 2024' },
    createdAt: '2025-09-14',
    likes: 389,
    rating: 4.8,
    ingredients: [
      { amount: '6', item: 'Fresh blackberries (plus extra for garnish)' },
      { amount: '2 oz', item: 'London Dry gin' },
      { amount: '¾ oz', item: 'Fresh lemon juice' },
      { amount: '½ oz', item: 'Simple syrup' },
      { amount: '½ oz', item: 'Crème de mûre (blackberry liqueur)' },
      { amount: 'Top', item: 'Club soda' },
      { amount: 'Garnish', item: 'Blackberries & lemon wedge' },
    ],
    steps: [
      { title: 'Muddle', desc: 'In a shaker, muddle 6 blackberries with simple syrup until fully broken down.' },
      { title: 'Add spirits & juice', desc: 'Add gin and lemon juice over the muddled berries.' },
      { title: 'Ice & shake', desc: 'Fill with ice and shake hard for 15 seconds.' },
      { title: 'Double strain', desc: 'Double strain (this removes the blackberry seeds) into a rocks glass over crushed ice.' },
      { title: 'Crème de mûre drizzle', desc: 'Drizzle the crème de mûre slowly over the top of the crushed ice — it will seep down through the drink, creating a purple gradient.' },
      { title: 'Top & garnish', desc: 'A small splash of club soda. Fresh blackberries on a pick and a lemon wedge.' },
    ],
    tips: [
      'Frozen blackberries work brilliantly here and release more juice than fresh.',
      'No crème de mûre? Use a blackberry jam (1 tsp) dissolved in a splash of warm water.',
      'The classic Bramble is served on crushed ice specifically — don\'t substitute cubed ice.',
    ],
    barNote: 'This was created by legendary bartender Dick Bradsell in 1984. My version adds the fizz element and doubles the blackberries.',
    reviews: [
      { id: 'r14', author: 'Lena S.', avatar: '👩', rating: 5, text: 'My absolute favourite cocktail, and this recipe nails it. The double strain tip is crucial — no one wants blackberry seeds in their teeth.', date: '2025-10-03' },
      { id: 'r15', author: 'Oliver M.', avatar: '🧑', rating: 5, text: 'Made this for autumn dinner party. The purple gradient through the crushed ice looks like something from a Michelin restaurant. Outstanding.', date: '2025-10-28' },
    ],
  },
]

// ── Storage helpers ──

export const loadCommunityDrinks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DRINKS)
    const userDrinks = stored ? JSON.parse(stored) : []
    return [...SEED_COMMUNITY_DRINKS, ...userDrinks]
  } catch {
    return [...SEED_COMMUNITY_DRINKS]
  }
}

export const saveCommunityDrink = (drink) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_DRINKS)
    const userDrinks = stored ? JSON.parse(stored) : []
    userDrinks.unshift(drink)
    localStorage.setItem(STORAGE_KEY_DRINKS, JSON.stringify(userDrinks))
    return drink
  } catch {
    return drink
  }
}

export const loadReviews = (drinkId) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_REVIEWS)
    const all = stored ? JSON.parse(stored) : {}
    const seed = SEED_COMMUNITY_DRINKS.find((d) => d.id === drinkId)?.reviews || []
    return [...seed, ...(all[drinkId] || [])]
  } catch {
    return []
  }
}

export const saveReview = (drinkId, review) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_REVIEWS)
    const all = stored ? JSON.parse(stored) : {}
    if (!all[drinkId]) all[drinkId] = []
    all[drinkId].push(review)
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(all))
  } catch {}
}

export const loadLikes = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_LIKES)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export const toggleLike = (drinkId) => {
  try {
    const likes = loadLikes()
    likes[drinkId] = !likes[drinkId]
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(likes))
    return likes[drinkId]
  } catch {
    return false
  }
}
