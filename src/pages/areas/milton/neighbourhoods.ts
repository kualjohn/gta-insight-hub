export interface MiltonNeighbourhood {
  slug: string;
  name: string;
  intro: string;
  vibe: string;
  housing: string;
  landmarks: string[];
}

export const MILTON_NEIGHBOURHOODS: MiltonNeighbourhood[] = [
  {
    slug: "old-milton",
    name: "Old Milton",
    intro:
      "Old Milton is the town's historic core — tree-lined streets, century homes, and walkable Main Street shops, restaurants, and the farmers' market. It's the most character-filled pocket in Milton and attracts buyers who want a real downtown feel.",
    vibe: "Historic, walkable, community-driven",
    housing: "Century homes, updated bungalows, and infill custom builds on generous lots.",
    landmarks: ["Main Street East", "Milton Farmers' Market", "Victoria Park", "Milton GO Station"],
  },
  {
    slug: "dorset-park",
    name: "Dorset Park",
    intro:
      "Dorset Park is one of Milton's most established residential pockets — mature trees, quiet crescents, and solid family homes just south of the downtown core.",
    vibe: "Established, mature, family-friendly",
    housing: "Detached backsplits, sidesplits, and 2-storey homes from the 70s and 80s on wide lots.",
    landmarks: ["Milton Sports Centre", "Bruce Trail access", "Sam Sherratt Trail"],
  },
  {
    slug: "bronte-meadows",
    name: "Bronte Meadows",
    intro:
      "Bronte Meadows is a quiet, established neighbourhood in south Milton with easy access to Highway 401 and the Milton GO — popular with commuters who still want mature streets.",
    vibe: "Quiet, established, commuter-friendly",
    housing: "Detached homes, semis, and townhouses from the 80s and 90s.",
    landmarks: ["Bronte Meadows Park", "Milton GO Station", "Highway 401 access"],
  },
  {
    slug: "timberlea",
    name: "Timberlea",
    intro:
      "Timberlea is a mature west-side community known for its curved streets, generous lots, and proximity to Kelso Conservation Area and the Niagara Escarpment.",
    vibe: "Mature, green, escarpment-adjacent",
    housing: "Detached 2-storeys and bungalows on larger lots, plus some executive homes closer to the escarpment.",
    landmarks: ["Kelso Conservation Area", "Rattlesnake Point", "Timberlea Park"],
  },
  {
    slug: "mountain-view",
    name: "Mountain View",
    intro:
      "Mountain View sits at the base of the Niagara Escarpment on Milton's west side — arguably the most scenic pocket in town, with direct views and quick access to the Bruce Trail.",
    vibe: "Scenic, quiet, nature-focused",
    housing: "Detached homes with escarpment views, custom builds, and a mix of established and newer streets.",
    landmarks: ["Niagara Escarpment", "Bruce Trail", "Rattlesnake Point Conservation Area"],
  },
  {
    slug: "dempsey",
    name: "Dempsey",
    intro:
      "Dempsey is a central Milton neighbourhood popular with young families — walkable to schools, parks, and everyday amenities, with a strong sense of community.",
    vibe: "Family-first, walkable, central",
    housing: "Detached homes, semis, and freehold townhouses built in the late 90s and early 2000s.",
    landmarks: ["Chris Hadfield Public School", "Dempsey Park", "Milton Mall"],
  },
  {
    slug: "clarke",
    name: "Clarke",
    intro:
      "Clarke is a well-planned family neighbourhood in southeast Milton with a strong school catchment and easy access to the Milton GO Station.",
    vibe: "Family-oriented, planned, commuter-friendly",
    housing: "Detached 2-storey homes, executive townhouses, and semis on tidy streets.",
    landmarks: ["Milton Sports Centre", "Milton GO Station", "Clarke community trails"],
  },
  {
    slug: "beaty",
    name: "Beaty",
    intro:
      "Beaty is one of Milton's most popular family neighbourhoods — top-rated schools, big parks, and a steady mix of detached homes and freehold townhouses.",
    vibe: "Family-first, established, school-focused",
    housing: "Detached 2-storeys, freehold townhouses, and semis built primarily in the 2000s.",
    landmarks: ["Beaty Trail", "P.L. Robertson Public School", "Milton Leisure Centre"],
  },
  {
    slug: "coates",
    name: "Coates",
    intro:
      "Coates is a well-established newer community in central Milton — a mix of detached homes and townhouses, close to shopping, transit, and the hospital.",
    vibe: "Convenient, established newer, family-friendly",
    housing: "Detached homes, freehold townhouses, and semis built in the mid-2000s.",
    landmarks: ["Milton District Hospital", "Milton Common", "Coates community trails"],
  },
  {
    slug: "scott",
    name: "Scott",
    intro:
      "Scott is a highly sought-after family neighbourhood along the Niagara Escarpment — top schools, big parks, and some of the newest housing stock in Milton.",
    vibe: "Sought-after, escarpment views, family-first",
    housing: "Newer detached 2-storeys, executive homes, and freehold townhouses.",
    landmarks: ["Sixteen Mile Creek", "Escarpment View Public School", "Kelso Conservation Area"],
  },
  {
    slug: "harrison",
    name: "Harrison",
    intro:
      "Harrison is a modern, family-focused community in west Milton — planned streetscapes, big parks, and easy access to the escarpment.",
    vibe: "Modern, planned, family-focused",
    housing: "Newer detached homes, semis, and freehold townhouses built in the 2010s.",
    landmarks: ["Harrison Park", "Sixteen Mile Creek trails", "Kelso Conservation Area"],
  },
  {
    slug: "willmott",
    name: "Willmott",
    intro:
      "Willmott is one of Milton's newer west-end neighbourhoods, popular with growing families thanks to newer schools, big parks, and modern homes.",
    vibe: "Newer, family-focused, growing",
    housing: "Detached 2-storeys, freehold townhouses, and semis built in the last 10-15 years.",
    landmarks: ["Willmott Park", "Anne J. MacArthur Public School", "Sixteen Mile Creek"],
  },
  {
    slug: "ford",
    name: "Ford",
    intro:
      "Ford is one of Milton's newest master-planned communities — modern homes, walkable schools and parks, and a young, growing population.",
    vibe: "New, modern, family-oriented",
    housing: "Recently built detached homes, freehold townhouses, and semis.",
    landmarks: ["Ford Community Park", "Boyne Public School", "Sixteen Mile Creek trails"],
  },
  {
    slug: "bowes",
    name: "Bowes",
    intro:
      "Bowes is part of Milton's Boyne Survey — a brand-new master-planned area with modern housing, new schools, and generous parkland.",
    vibe: "Brand-new, planned, family-first",
    housing: "Newly built detached homes, freehold townhouses, and semis on modern streetscapes.",
    landmarks: ["Boyne Survey parks", "Newer elementary schools", "Sixteen Mile Creek trails"],
  },
  {
    slug: "cobban",
    name: "Cobban",
    intro:
      "Cobban is one of Milton's newest communities in the south Boyne area — new construction, wide streets, and steady demand from young families.",
    vibe: "Brand-new, modern, growing",
    housing: "Recently built detached homes, freehold townhouses, and semis.",
    landmarks: ["New Boyne parks", "Cobban community trails", "Milton Education Village (planned)"],
  },
  {
    slug: "walker",
    name: "Walker",
    intro:
      "Walker is a newer southeast Milton community with a young, family-focused vibe and quick access to Highway 401 and the Milton GO.",
    vibe: "Newer, commuter-friendly, family-first",
    housing: "Modern detached homes, freehold townhouses, and semis.",
    landmarks: ["Walker community parks", "Milton GO Station", "Highway 401 access"],
  },
  {
    slug: "trafalgar",
    name: "Trafalgar",
    intro:
      "Trafalgar is a rural-edge community on Milton's east side — larger lots, estate homes, and a quieter, more spacious feel than the central neighbourhoods.",
    vibe: "Rural-edge, spacious, estate feel",
    housing: "Estate detached homes, custom builds, and larger-lot properties.",
    landmarks: ["Trafalgar Road corridor", "Rural Milton countryside", "Halton conservation areas"],
  },
];

export const MILTON_NEIGHBOURHOOD_MAP: Record<string, MiltonNeighbourhood> =
  Object.fromEntries(MILTON_NEIGHBOURHOODS.map((n) => [n.slug, n]));