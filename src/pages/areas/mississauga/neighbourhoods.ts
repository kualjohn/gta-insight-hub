export interface MississaugaNeighbourhood {
  slug: string;
  name: string;
  intro: string;
  vibe: string;
  housing: string;
  landmarks: string[];
}

export const MISSISSAUGA_NEIGHBOURHOODS: MississaugaNeighbourhood[] = [
  {
    slug: "port-credit",
    name: "Port Credit",
    intro:
      "Port Credit is Mississauga's waterfront village — a walkable stretch of restaurants, patios, and marina life along Lakeshore Road, with the GO train downtown in about 20 minutes. Demand here is consistently strong from downsizers, professionals, and lifestyle buyers.",
    vibe: "Waterfront village, walkable, lifestyle-driven",
    housing: "Older detached homes and cottages on deep lots, custom rebuilds, and new mid-rise waterfront condos.",
    landmarks: ["Port Credit Harbour Marina", "Lakeshore Road East", "Port Credit GO Station", "J.C. Saddington Park"],
  },
  {
    slug: "lorne-park",
    name: "Lorne Park",
    intro:
      "Lorne Park is one of Mississauga's most prestigious neighbourhoods — mature tree canopy, half-acre lots, and top-ranked schools. Homes here trade well above the city median and buyers are typically move-up families relocating from Toronto.",
    vibe: "Prestigious, private, mature",
    housing: "Large detached homes, ravine lots, and luxury custom builds.",
    landmarks: ["Lorne Park Secondary School", "Jack Darling Memorial Park", "Rattray Marsh Conservation Area"],
  },
  {
    slug: "mineola",
    name: "Mineola",
    intro:
      "Mineola sits between the QEW and the lake, split into Mineola East and West — wide lots, winding streets, and a strong custom-build market. It's one of the most active teardown-and-rebuild pockets in south Mississauga.",
    vibe: "Leafy, upscale, custom-build hotspot",
    housing: "Original bungalows on oversized lots alongside new luxury custom homes.",
    landmarks: ["Kenollie Park", "Port Credit GO Station", "Cawthra Road corridor"],
  },
  {
    slug: "clarkson",
    name: "Clarkson",
    intro:
      "Clarkson blends a village main street, mature residential streets, and quick GO access to downtown Toronto. It appeals to families who want established neighbourhoods without Lorne Park pricing.",
    vibe: "Established, family-oriented, commuter-friendly",
    housing: "Detached homes from the 60s to 80s, semis, townhouses, and pockets of new infill.",
    landmarks: ["Clarkson GO Station", "Clarkson Village", "Rattray Marsh", "Meadow Wood"],
  },
  {
    slug: "erin-mills",
    name: "Erin Mills",
    intro:
      "Erin Mills is a large master-planned community in west Mississauga with mature parks, good schools, and a mix of housing that suits both first-time buyers and growing families.",
    vibe: "Master-planned, green, family-friendly",
    housing: "Detached homes, semis, freehold townhouses, and low-rise condos.",
    landmarks: ["Erin Mills Parkway", "South Common Community Centre", "Sawmill Creek Trail", "University of Toronto Mississauga nearby"],
  },
  {
    slug: "central-erin-mills",
    name: "Central Erin Mills",
    intro:
      "Central Erin Mills is one of Mississauga's most in-demand family neighbourhoods, anchored by John Fraser and Gonzaga school catchments and Erin Mills Town Centre. School boundaries drive a real price premium here.",
    vibe: "Top-school catchment, newer, high demand",
    housing: "Detached homes from the 90s and 2000s, executive townhouses, and condo towers near the mall.",
    landmarks: ["Erin Mills Town Centre", "John Fraser Secondary School", "Credit Valley Hospital"],
  },
  {
    slug: "streetsville",
    name: "Streetsville",
    intro:
      "Streetsville is the 'village in the city' — a historic main street with independent shops and restaurants, the Credit River, and a strong community identity that keeps resale demand steady.",
    vibe: "Historic village, walkable, community-driven",
    housing: "Century homes, post-war detached, newer infill, and low-rise condos near Queen Street.",
    landmarks: ["Queen Street South", "Streetsville GO Station", "Credit River", "Streetsville Memorial Park"],
  },
  {
    slug: "meadowvale",
    name: "Meadowvale",
    intro:
      "Meadowvale is a well-established northwest community built around conservation lands and Lake Aquitaine, offering some of the best value per square foot in Mississauga.",
    vibe: "Green, affordable, established",
    housing: "Detached homes, semis, townhouses, and condo apartments from the 70s through 90s.",
    landmarks: ["Lake Aquitaine Park", "Meadowvale Town Centre", "Meadowvale GO Station", "Meadowvale Conservation Area"],
  },
  {
    slug: "meadowvale-village",
    name: "Meadowvale Village",
    intro:
      "Meadowvale Village is a designated heritage conservation district surrounded by newer executive subdivisions — a rare mix of 19th-century character homes and large modern detached houses.",
    vibe: "Heritage character, executive, quiet",
    housing: "Heritage homes in the village core plus large detached homes from the 90s and 2000s.",
    landmarks: ["Meadowvale Village Heritage Conservation District", "Derry Road corridor", "Lions Club Park"],
  },
  {
    slug: "churchill-meadows",
    name: "Churchill Meadows",
    intro:
      "Churchill Meadows is a newer west-end community popular with growing families — modern housing stock, newer schools, and easy access to Highways 403 and 407.",
    vibe: "Newer, family-heavy, convenient",
    housing: "Detached homes and freehold townhouses built from the late 90s onward.",
    landmarks: ["Churchill Meadows Community Centre", "Ridgeway Plaza", "Highway 403 and 407 access"],
  },
  {
    slug: "lisgar",
    name: "Lisgar",
    intro:
      "Lisgar sits at Mississauga's northwest edge, next to Osprey Marsh and close to Lisgar GO. It's a practical, quiet family neighbourhood with strong first-time move-up buyer demand.",
    vibe: "Quiet, suburban, commuter-friendly",
    housing: "Detached homes, semis, and townhouses built in the 1990s.",
    landmarks: ["Lisgar GO Station", "Osprey Marsh", "Lisgar Fields"],
  },
  {
    slug: "east-credit",
    name: "East Credit",
    intro:
      "East Credit is one of Mississauga's largest neighbourhoods, spanning Heartland and the Credit River corridor. Its central location and wide range of home sizes keep buyer traffic high year-round.",
    vibe: "Central, diverse housing, high turnover",
    housing: "Detached homes from the 80s and 90s, semis, and executive homes near the river.",
    landmarks: ["Heartland Town Centre", "Credit River", "Braeben Golf Course"],
  },
  {
    slug: "cooksville",
    name: "Cooksville",
    intro:
      "Cooksville is a central, transit-rich neighbourhood undergoing steady intensification along Hurontario, with the Hazel McCallion LRT reshaping demand along the corridor.",
    vibe: "Central, transit-focused, transitioning",
    housing: "Older detached and semis on the side streets, plus a growing base of condo apartments.",
    landmarks: ["Cooksville GO Station", "Hurontario LRT corridor", "Trillium Health Partners Mississauga Hospital"],
  },
  {
    slug: "city-centre",
    name: "City Centre",
    intro:
      "City Centre is Mississauga's downtown — the condo core around Square One, Celebration Square, and the city's transit hub. It's the most active condo resale market in the city.",
    vibe: "Urban, high-rise, amenity-rich",
    housing: "Condo apartments and a small number of townhouse pockets.",
    landmarks: ["Square One Shopping Centre", "Celebration Square", "Sheridan College Hazel McCallion Campus", "City Centre Transit Terminal"],
  },
  {
    slug: "rathwood",
    name: "Rathwood",
    intro:
      "Rathwood is a mature east-end neighbourhood with mature trees, quiet crescents, and quick 403 access — steady, low-drama demand from families upgrading within Mississauga.",
    vibe: "Mature, quiet, established",
    housing: "Detached homes and semis from the 70s and 80s, plus townhouse and condo pockets.",
    landmarks: ["Rathwood Park", "Burnhamthorpe Road corridor", "Etobicoke Creek Trail"],
  },
  {
    slug: "applewood",
    name: "Applewood",
    intro:
      "Applewood is an established east Mississauga neighbourhood close to the Toronto border, popular for large lots and strong renovation potential at reasonable entry prices.",
    vibe: "Established, value-focused, renovation-friendly",
    housing: "Bungalows, backsplits, and 2-storey detached homes on wide lots.",
    landmarks: ["Applewood Hills Park", "Dixie Outlet area", "Highway 427 access"],
  },
  {
    slug: "lakeview",
    name: "Lakeview",
    intro:
      "Lakeview is south Mississauga's most talked-about growth story — waterfront redevelopment, new parkland, and a wave of infill builds transforming a traditionally modest lakeside neighbourhood.",
    vibe: "Lakeside, changing fast, investment-driven",
    housing: "Post-war bungalows, custom infill rebuilds, and new townhouse developments.",
    landmarks: ["Lakeview Village redevelopment", "Lakefront Promenade Park", "Marie Curtis Park"],
  },
  {
    slug: "erindale",
    name: "Erindale",
    intro:
      "Erindale is a central, leafy neighbourhood along the Credit River with a mix of older character homes and newer builds, close to UTM and the Erindale GO.",
    vibe: "Leafy, central, mixed-age",
    housing: "Detached homes across several decades, some large river lots, and low-rise condos.",
    landmarks: ["Erindale Park", "Credit River", "Erindale GO Station", "University of Toronto Mississauga"],
  },
  {
    slug: "fairview",
    name: "Fairview",
    intro:
      "Fairview sits just west of the City Centre, offering walkable access to Square One with a quieter residential feel and a strong mix of freehold and condo options.",
    vibe: "Central, practical, walkable to downtown",
    housing: "Older detached and semis, townhouses, and condo apartments.",
    landmarks: ["Square One nearby", "Fairview Public School", "Hurontario Street corridor"],
  },
  {
    slug: "malton",
    name: "Malton",
    intro:
      "Malton is Mississauga's northeast community near Pearson Airport — the most affordable entry point into the city's freehold market, with strong end-user and investor demand.",
    vibe: "Affordable, diverse, close to Pearson",
    housing: "Detached homes, semis, townhouses, and condo apartments from the 60s through 80s.",
    landmarks: ["Toronto Pearson International Airport", "Malton Community Centre", "Westwood Square", "Malton GO Station"],
  },
];

export const MISSISSAUGA_NEIGHBOURHOOD_MAP: Record<string, MississaugaNeighbourhood> =
  Object.fromEntries(MISSISSAUGA_NEIGHBOURHOODS.map((n) => [n.slug, n]));
