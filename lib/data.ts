export type Officer = {
  name: string;
  title: string;
  phone?: string;
  email?: string;
};

export type Entity = {
  id: string;
  name: string;
  category: "ministry" | "agency" | "parastatal";
  description: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  officers: Officer[];
};

export const entities: Entity[] = [

  // ─── MINISTRIES ───────────────────────────────────────────────────────────

  {
    id: "min-finance",
    name: "Ministry of Finance",
    category: "ministry",
    description: "Responsible for formulating and executing financial policies, managing the state's revenue and expenditure.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630000",
    email: "info@finance.lagosstate.gov.ng",
    website: "https://finance.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Yomi Oluyomi", title: "Commissioner for Finance" },
      { name: "Mrs. Abosede Adeleke", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-budget",
    name: "Ministry of Economic Planning and Budget",
    category: "ministry",
    description: "Coordinates economic planning, budget preparation and implementation for sustainable growth in Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630050",
    email: "info@mepb.lagosstate.gov.ng",
    website: "https://mepb.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Mosopefolu George", title: "Commissioner for Economic Planning & Budget" },
    ],
  },
  {
    id: "min-health",
    name: "Ministry of Health",
    category: "ministry",
    description: "Oversees health policy, hospital administration, and public health services across Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630100",
    email: "info@health.lagosstate.gov.ng",
    website: "https://health.lagosstate.gov.ng",
    officers: [
      { name: "Prof. Akin Abayomi", title: "Commissioner for Health" },
      { name: "Dr. Olusegun Ogboye", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-education",
    name: "Ministry of Education",
    category: "ministry",
    description: "Manages primary, secondary, and tertiary education policy, curriculum development and teacher welfare.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630200",
    email: "info@education.lagosstate.gov.ng",
    website: "https://education.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Folasade Adefisayo", title: "Commissioner for Education" },
      { name: "Mr. Adesola Olusanya", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-works",
    name: "Ministry of Works and Infrastructure",
    category: "ministry",
    description: "Coordinates construction and maintenance of roads, bridges, drains and public infrastructure.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630300",
    email: "info@works.lagosstate.gov.ng",
    website: "https://works.lagosstate.gov.ng",
    officers: [
      { name: "Engr. Ganiyu Johnson", title: "Commissioner for Works & Infrastructure" },
      { name: "Mr. Biodun Junaid", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-agric",
    name: "Ministry of Agriculture",
    category: "ministry",
    description: "Drives agricultural development, food security and rural livelihood programs in Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630400",
    email: "info@agriculture.lagosstate.gov.ng",
    website: "https://agriculture.lagosstate.gov.ng",
    officers: [
      { name: "Ms. Abisola Olusanya", title: "Commissioner for Agriculture" },
      { name: "Mr. Hakeem Adeniran", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-justice",
    name: "Ministry of Justice",
    category: "ministry",
    description: "Provides legal advisory services to the state government and handles prosecution and law reform matters.",
    location: "Alausa, Ikeja",
    address: "State Counsel Chambers, Secretariat Road, Alausa, Ikeja",
    phone: "+234-1-7630500",
    email: "info@justice.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Lawal Pedro (SAN)", title: "Attorney General & Commissioner for Justice" },
    ],
  },
  {
    id: "min-housing",
    name: "Ministry of Housing",
    category: "ministry",
    description: "Handles affordable housing development, urban renewal and estate management in Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630600",
    email: "info@housing.lagosstate.gov.ng",
    website: "https://housing.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Moruf Akinderu-Fatai", title: "Commissioner for Housing" },
      { name: "Mrs. Seun Osibona", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-transport",
    name: "Ministry of Transportation",
    category: "ministry",
    description: "Regulates and develops transportation systems including roads, waterways and rail in Lagos.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630700",
    email: "info@transportation.lagosstate.gov.ng",
    website: "https://transportation.lagosstate.gov.ng",
    officers: [
      { name: "Dr. Frederic Oladeinde", title: "Commissioner for Transportation" },
      { name: "Mr. Olawale Musa", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-environment",
    name: "Ministry of Environment and Water Resources",
    category: "ministry",
    description: "Manages environmental regulation, water supply, waste management and climate action.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630800",
    email: "info@environment.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Tokunbo Wahab", title: "Commissioner for Environment & Water Resources" },
    ],
  },
  {
    id: "min-commerce",
    name: "Ministry of Commerce, Industry and Cooperatives",
    category: "ministry",
    description: "Promotes trade, industrial growth, SME development and cooperative societies in Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630900",
    email: "info@mcic.lagosstate.gov.ng",
    website: "https://mcic.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Folashade Ambrose-Medebem", title: "Commissioner for Commerce, Industry & Cooperatives" },
    ],
  },
  {
    id: "min-energy",
    name: "Ministry of Energy and Mineral Resources",
    category: "ministry",
    description: "Plans and implements state policies on energy, power and mineral resources development.",
    location: "Alausa, Ikeja",
    address: "Block 6, The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631000",
    email: "info@memr.lagosstate.gov.ng",
    website: "https://memr.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Olalere Odusote", title: "Commissioner for Energy & Mineral Resources" },
    ],
  },
  {
    id: "min-science",
    name: "Ministry of Science and Technology",
    category: "ministry",
    description: "Plans and implements Lagos State policies on science, technology and digital innovation.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631100",
    email: "info@most.lagosstate.gov.ng",
    website: "https://most.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Tunbosun Alake", title: "Commissioner for Science & Technology" },
    ],
  },
  {
    id: "min-information",
    name: "Ministry of Information and Strategy",
    category: "ministry",
    description: "Manages government communications, media strategy and public information dissemination.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631200",
    email: "info@information.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Gbenga Omotoso", title: "Commissioner for Information & Strategy" },
    ],
  },
  {
    id: "min-physical-planning",
    name: "Ministry of Physical Planning and Urban Development",
    category: "ministry",
    description: "Oversees land use planning, urban development, and spatial planning policy for Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631300",
    email: "info@mppud.lagosstate.gov.ng",
    officers: [
      { name: "Dr. Olumide Abiodun Oluyinka", title: "Commissioner for Physical Planning & Urban Development" },
    ],
  },
  {
    id: "min-waterfront",
    name: "Ministry of Waterfront Infrastructure Development",
    category: "ministry",
    description: "Responsible for developing and managing Lagos waterfront and coastal infrastructure.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631400",
    email: "info@waterfront.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Yakubu Adebayo Alebiosu", title: "Commissioner for Waterfront Infrastructure Development" },
    ],
  },
  {
    id: "min-local-govt",
    name: "Ministry of Local Government and Community Affairs",
    category: "ministry",
    description: "Plans and implements policies on local government administration, community development and chieftaincy affairs.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631500",
    email: "info@mlgca.lagosstate.gov.ng",
    website: "https://mlgca.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Kayode Bolaji-Roberts", title: "Commissioner for Local Government & Community Affairs" },
    ],
  },
  {
    id: "min-women",
    name: "Ministry of Women Affairs and Poverty Alleviation",
    category: "ministry",
    description: "Drives gender equity, women empowerment and poverty reduction programs across Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631600",
    email: "info@wapa.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Bolaji Cecilia Dada", title: "Commissioner for Women Affairs & Poverty Alleviation" },
    ],
  },
  {
    id: "min-youth",
    name: "Ministry of Youth and Social Development",
    category: "ministry",
    description: "Handles youth development, social welfare, sports promotion and community empowerment programs.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631700",
    email: "info@youth.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Mobolaji Ogunlende", title: "Commissioner for Youth & Social Development" },
    ],
  },
  {
    id: "min-home-affairs",
    name: "Ministry of Home Affairs",
    category: "ministry",
    description: "Manages chieftaincy affairs, cultural heritage, religious matters and inter-community relations.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631800",
    email: "info@homeaffair.lagosstate.gov.ng",
    website: "https://homeaffair.lagosstate.gov.ng",
    officers: [
      { name: "Prince Anofi Elegushi", title: "Commissioner for Home Affairs" },
    ],
  },
  {
    id: "min-establishments",
    name: "Ministry of Establishments, Training and Pensions",
    category: "ministry",
    description: "Manages civil service recruitment, human capital development, training and pension administration.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7631900",
    email: "info@establishments.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Afolabi Ayantayo", title: "Commissioner for Establishments, Training & Pensions" },
    ],
  },
  {
    id: "min-special-duties",
    name: "Ministry of Special Duties and Intergovernmental Relations",
    category: "ministry",
    description: "Coordinates disaster management, emergency response and inter-governmental relations for Lagos State.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7632000",
    email: "info@specialduties.lagosstate.gov.ng",
    website: "https://specialduties.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Seye Oladejo", title: "Commissioner for Special Duties & Intergovernmental Relations" },
    ],
  },
  {
    id: "min-wealth",
    name: "Ministry of Wealth Creation and Employment",
    category: "ministry",
    description: "Drives job creation, entrepreneurship, cooperative support and wealth distribution programs.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7632100",
    email: "info@wealth.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Yetunde Arobieke", title: "Commissioner for Wealth Creation & Employment" },
    ],
  },

  // ─── AGENCIES ─────────────────────────────────────────────────────────────

  {
    id: "lasg-lasepa",
    name: "Lagos State Environmental Protection Agency (LASEPA)",
    category: "agency",
    description: "Responsible for environmental monitoring, pollution control and enforcement of environmental laws.",
    location: "Alausa, Ikeja",
    address: "LASEPA Building, Governor's Road, The Secretariat, Alausa, Lagos",
    phone: "+234-704-635-1295",
    email: "complaint@lasepa.gov.ng",
    website: "https://lasepa.gov.ng",
    officers: [
      { name: "Dr. Dolapo Fasawe", title: "General Manager" },
    ],
  },
  {
    id: "lasg-lasaa",
    name: "Lagos State Signage and Advertisement Agency (LASAA)",
    category: "agency",
    description: "Regulates the outdoor advertising industry and signage in Lagos State.",
    location: "Ilupeju, Lagos",
    address: "3B, Town Planning Way, Ilupeju Industrial Scheme, Lagos",
    phone: "+234-1-4510792",
    email: "info@lasaa.gov.ng",
    officers: [
      { name: "Mr. Adedamola Docemo", title: "Managing Director/CEO" },
    ],
  },
  {
    id: "lasg-lirs",
    name: "Lagos Internal Revenue Service (LIRS)",
    category: "agency",
    description: "Assesses, collects and accounts for all taxes, levies and revenues due to Lagos State.",
    location: "Alausa, Ikeja",
    address: "Revenue House, 15A, Akintoye Jolaoso Street, Alausa, Ikeja",
    phone: "+234-1-2702208",
    email: "info@lirs.gov.ng",
    website: "https://lirs.gov.ng",
    officers: [
      { name: "Mr. Ayodele Subair", title: "Executive Chairman" },
      { name: "Mrs. Modupe Ade-Kayode", title: "Director, Tax Operations" },
    ],
  },
  {
    id: "lasg-lamata",
    name: "Lagos Metropolitan Area Transport Authority (LAMATA)",
    category: "agency",
    description: "Plans, coordinates and manages transportation in the Lagos metropolitan area including BRT and ferries.",
    location: "Alausa, Ikeja",
    address: "Block C, 2nd Floor, Motorways Centre, 1 Motorways Avenue, Alausa, Ikeja",
    phone: "01-2702778",
    email: "info@lamata-ng.com",
    website: "https://lamata-ng.com",
    officers: [
      { name: "Mr. Abimbola Akinajo", title: "Managing Director" },
    ],
  },
  {
    id: "lasg-lasema",
    name: "Lagos State Emergency Management Agency (LASEMA)",
    category: "agency",
    description: "Coordinates emergency response, disaster management and relief operations across Lagos State.",
    location: "Alausa, Ikeja",
    address: "Block 19, State Government Secretariat, Obafemi Awolowo Way, Alausa, Ikeja",
    phone: "8060907333",
    email: "info@lasema.lagosstate.gov.ng",
    website: "https://lasema.lagosstate.gov.ng",
    officers: [
      { name: "Dr. Femi Oke-Osanyintolu", title: "Director General/CEO" },
    ],
  },
  {
    id: "lasg-lasbca",
    name: "Lagos State Building Control Agency (LASBCA)",
    category: "agency",
    description: "Ensures minimum building standards are maintained in construction and renovation of buildings across Lagos.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-4931348",
    email: "info@lasbca.lagosstate.gov.ng",
    website: "https://lasbca.lagosstate.gov.ng",
    officers: [
      { name: "Arc. Gbolahan Owodunni Oki (FNIA)", title: "General Manager" },
    ],
  },
  {
    id: "lasg-laswa",
    name: "Lagos State Waterways Authority (LASWA)",
    category: "agency",
    description: "Regulates boat and ferry operations, and oversees water transportation safety across Lagos waterways.",
    location: "Lagos Island",
    address: "32, Lawson Street, Onikan, Lagos",
    phone: "+234-1-2700900",
    email: "info@laswa.lagosstate.gov.ng",
    officers: [
      { name: "Ms. Oluwadamilola Emmanuel", title: "General Manager" },
    ],
  },
  {
    id: "lasg-laspark",
    name: "Lagos State Parks and Gardens Agency (LASPARK)",
    category: "agency",
    description: "Manages public parks, gardens, recreational spaces and open green areas across Lagos.",
    location: "Ikeja",
    address: "Agege Motor Road, Ikeja, Lagos",
    phone: "+234-1-4931250",
    email: "info@laspark.gov.ng",
    officers: [
      { name: "Mrs. Adetoun Popoola", title: "General Manager" },
    ],
  },
  {
    id: "lasg-taskforce",
    name: "Lagos State Environmental and Special Offences Unit (Task Force)",
    category: "agency",
    description: "Enforces environmental laws and handles special offences including illegal structures and street trading.",
    location: "Alausa, Ikeja",
    address: "The Secretariat, Off Governor's Road, Opposite LASEPA, Obafemi Awolowo Way, Alausa, Ikeja",
    phone: "8033183477",
    email: "info@taskforce.lagosstate.gov.ng",
    website: "https://taskforce.lagosstate.gov.ng",
    officers: [
      { name: "CSP Shola Jejeloye", title: "Chairman" },
    ],
  },
  {
    id: "lasg-lasiec",
    name: "Lagos State Independent Electoral Commission (LASIEC)",
    category: "agency",
    description: "Organises and conducts local government and chieftaincy elections in Lagos State.",
    location: "Yaba",
    address: "2, Birrel Avenue, Sabo, Yaba, Lagos",
    phone: "08023126327",
    email: "info@lasiec.lagosstate.gov.ng",
    website: "https://lasiec.lagosstate.gov.ng",
    officers: [
      { name: "Justice Candide-Johnson (Rtd)", title: "Chairman" },
    ],
  },
  {
    id: "lasg-lasiama",
    name: "Lagos State Infrastructure Asset Management Agency (LASIAMA)",
    category: "agency",
    description: "Manages and maintains Lagos State government infrastructure assets for optimal performance.",
    location: "Alausa, Ikeja",
    address: "Lagos State Government Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630000",
    email: "info@lasiama.lagosstate.gov.ng",
    website: "https://lasiama.lagosstate.gov.ng",
    officers: [
      { name: "Engr. Aramide Adeyoye", title: "General Manager" },
    ],
  },
  {
    id: "lasg-lasimra",
    name: "Lagos State Infrastructure Maintenance and Regulatory Agency (LASIMRA)",
    category: "agency",
    description: "Regulates utility infrastructure including oil, gas, telecommunications and electricity companies in Lagos.",
    location: "Agidingbi, Ikeja",
    address: "2 Yusuf Close, Off Bayo Ajayi Street, Agidingbi Phase 2, Ikeja",
    phone: "+234-1-4931300",
    email: "info@lasimra.gov.ng",
    website: "https://lasimra.gov.ng",
    officers: [
      { name: "Mrs. Bisoye Coker-Odusote", title: "General Manager/CEO" },
    ],
  },

  // ─── PARASTATALS ──────────────────────────────────────────────────────────

  {
    id: "lasg-lawma",
    name: "Lagos State Waste Management Authority (LAWMA)",
    category: "parastatal",
    description: "Manages solid waste collection, disposal and recycling services across Lagos State.",
    location: "Ojota",
    address: "LAWMA Headquarters, Along Lagos-Ibadan Expressway, Ojota, Lagos",
    phone: "+234-1-4930022",
    email: "info@lawma.gov.ng",
    website: "https://lawma.gov.ng",
    officers: [
      { name: "Mr. Ibrahim Odumboni", title: "Managing Director" },
      { name: "Mrs. Toyin Oke", title: "Executive Director, Operations" },
    ],
  },
  {
    id: "lasg-lasu",
    name: "Lagos State University (LASU)",
    category: "parastatal",
    description: "State-owned university providing tertiary education in science, arts, law and management sciences.",
    location: "Ojo",
    address: "LASU Main Campus, Badagry Expressway, Ojo, Lagos",
    phone: "+234-1-7740000",
    email: "registrar@lasu.edu.ng",
    website: "https://lasu.edu.ng",
    officers: [
      { name: "Prof. Ibiyemi Olatunji-Bello", title: "Vice Chancellor" },
      { name: "Mr. Emmanuel Fabunmi", title: "Registrar" },
    ],
  },
  {
    id: "lasg-lasuth",
    name: "Lagos State University Teaching Hospital (LASUTH)",
    category: "parastatal",
    description: "Premier state-owned teaching hospital providing specialist health care and medical training in Lagos.",
    location: "Ikeja",
    address: "1-5, Oba Akinjobi Road, Ikeja GRA, Lagos",
    phone: "+234-1-2793800",
    email: "info@lasuth.gov.ng",
    officers: [
      { name: "Prof. Adetokunbo Fabamwo", title: "Chief Medical Director" },
    ],
  },
  {
    id: "lasg-lagis",
    name: "Lagos State Geographic Information Systems (LAGIS)",
    category: "parastatal",
    description: "Manages geographic data, land registration, mapping and GIS services for Lagos State.",
    location: "Alausa, Ikeja",
    address: "Land Bureau Complex, Alausa Secretariat, Ikeja, Lagos",
    phone: "+234-1-4939000",
    email: "info@lagis.gov.ng",
    officers: [
      { name: "Mr. Olajide Babatunde", title: "Director General" },
    ],
  },
  {
    id: "lasg-lspwc",
    name: "Lagos State Public Works Corporation (LSPWC)",
    category: "parastatal",
    description: "Executes public works projects, road maintenance and infrastructure construction for Lagos State.",
    location: "Isheri, Ojodu",
    address: "Works Road, Ojodu-Berger, Isheri, Lagos",
    phone: "+234-1-7630000",
    email: "info@lspwc-ng.com",
    website: "https://lspwc-ng.com",
    officers: [
      { name: "Engr. Aramide Adeyoye", title: "Managing Director" },
    ],
  },
  {
    id: "lasg-lstf",
    name: "Lagos State Security Trust Fund (LSSTF)",
    category: "parastatal",
    description: "Mobilises resources to support and equip security agencies for improved safety in Lagos State.",
    location: "Lagos Island",
    address: "Lagos State Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630000",
    email: "info@lagosstatesecuritytrustfund.org",
    website: "https://lagosstatesecuritytrustfund.org",
    officers: [
      { name: "Mr. Rasaq Balogun", title: "Executive Secretary" },
    ],
  },
  {
    id: "lasg-lbic",
    name: "Lagos State Building Investment Corporation (LBIC)",
    category: "parastatal",
    description: "Develops and manages real estate investments and affordable housing on behalf of Lagos State.",
    location: "Ebute Metta",
    address: "3, Borno Way, Ebute Metta, Lagos",
    phone: "+234-1-5850001",
    email: "info@lbic.gov.ng",
    officers: [
      { name: "Arc. Gbolahan Lawal", title: "Managing Director" },
    ],
  },
  {
    id: "lasg-ferry",
    name: "Lagos State Ferry Services Corporation",
    category: "parastatal",
    description: "Provides affordable and reliable ferry passenger services across Lagos waterways.",
    location: "Onikan, Lagos Island",
    address: "32, Lawson Street, Onikan, Lagos",
    phone: "+234-1-2700800",
    email: "info@ferryservices.lagosstate.gov.ng",
    website: "https://ferryservices.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Kehinde Osinaike", title: "Managing Director" },
    ],
  },
  {
    id: "lasg-radio-lagos",
    name: "Radio Lagos",
    category: "parastatal",
    description: "State-owned public broadcaster providing news, information and entertainment to Lagos residents.",
    location: "Agidingbi, Ikeja",
    address: "2A, Lateef Jakande Road, Agidingbi, Ikeja, Lagos",
    phone: "234-1-4960568",
    email: "info@radio.org.ng",
    website: "https://radio.org.ng/lagos",
    officers: [
      { name: "Mr. Tokunbo Adebisi", title: "General Manager" },
    ],
  },
  {
    id: "lasg-ekofm",
    name: "Eko FM",
    category: "parastatal",
    description: "Lagos State Government FM radio station broadcasting music, culture and current affairs content.",
    location: "Agidingbi, Ikeja",
    address: "Lateef Jakande Road, Agidingbi, Ikeja, Lagos",
    phone: "014960568",
    email: "info@ekofm.lagosstate.gov.ng",
    website: "https://ekofm.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Bidemi Zakariyau", title: "General Manager" },
    ],
  },
  {
    id: "lasg-exam-board",
    name: "Lagos State Examinations Board (LSEB)",
    category: "parastatal",
    description: "Conducts secondary school examinations and manages standardised testing for Lagos State students.",
    location: "Agege",
    address: "254, Ipaja Road, Near Mulero Bus Stop, Agege, Lagos",
    phone: "08023548336",
    email: "info@examboard.lagosstate.gov.ng",
    website: "https://examboard.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Abiodun Adewale", title: "Registrar" },
    ],
  },
  {
    id: "lasg-arts-culture",
    name: "Lagos State Council for Arts and Culture",
    category: "parastatal",
    description: "Promotes, preserves and develops arts, culture and creative industries across Lagos State.",
    location: "Ikeja",
    address: "133, Obafemi Awolowo Way, Ikeja, Lagos",
    phone: "09099155485",
    email: "info@artandculture.lagosstate.gov.ng",
    website: "https://artandculture.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Makinde Adeniran", title: "Executive Director" },
    ],
  },
  {
    id: "lasg-litf",
    name: "Lagos International Trade Fair Complex Management Board",
    category: "parastatal",
    description: "Manages and operates the Lagos International Trade Fair Complex to promote commerce and industry.",
    location: "Abule Osun, Lagos",
    address: "Lagos-Badagry Expressway, Abule Osun, Lagos",
    phone: "+234-1-5890797",
    email: "info@litf.gov.ng",
    officers: [
      { name: "Mr. Rezak Abiodun Balogun", title: "General Manager" },
    ],
  },
];

export const getByCategory = (category: Entity["category"]) =>
  entities.filter((e) => e.category === category);

export const getById = (id: string) => entities.find((e) => e.id === id);

export const searchEntities = (query: string) => {
  const q = query.toLowerCase();
  return entities.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.officers.some((o) => o.name.toLowerCase().includes(q))
  );
};
