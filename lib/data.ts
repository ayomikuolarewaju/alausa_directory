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
  // MINISTRIES
  {
    id: "min-finance",
    name: "Ministry of Finance",
    category: "ministry",
    description: "Responsible for formulating and executing financial policies, managing the state's revenue and expenditure.",
    location: "Lagos Island",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630000",
    email: "info@finance.lagosstate.gov.ng",
    website: "https://lagosstate.gov.ng",
    officers: [
      { name: "Mr. Wale Edun", title: "Commissioner for Finance" },
      { name: "Mrs. Abosede Adeleke", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-health",
    name: "Ministry of Health",
    category: "ministry",
    description: "Oversees health policy, hospital administration, and public health services across Lagos State.",
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630100",
    email: "info@health.lagosstate.gov.ng",
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
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630200",
    email: "info@education.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Folasade Adefisayo", title: "Commissioner for Education" },
      { name: "Mr. Adesola Olusanya", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-works",
    name: "Ministry of Works & Infrastructure",
    category: "ministry",
    description: "Coordinates construction and maintenance of roads, bridges, drains and public infrastructure.",
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630300",
    email: "info@works.lagosstate.gov.ng",
    officers: [
      { name: "Engr. Aramide Adeyoye", title: "Commissioner for Works & Infrastructure" },
      { name: "Mr. Biodun Junaid", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-agric",
    name: "Ministry of Agriculture",
    category: "ministry",
    description: "Drives agricultural development, food security and rural livelihood programs in Lagos State.",
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630400",
    email: "info@agric.lagosstate.gov.ng",
    officers: [
      { name: "Ms. Abisola Olusanya", title: "Commissioner for Agriculture" },
      { name: "Mr. Hakeem Adeniran", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-justice",
    name: "Ministry of Justice",
    category: "ministry",
    description: "Provides legal advisory services to the state government and handles prosecution matters.",
    location: "Lagos Island",
    address: "State Counsel Chambers, Secretariat Road, Alausa, Ikeja",
    phone: "+234-1-7630500",
    email: "info@justice.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Moyosore Onigbanjo (SAN)", title: "Attorney General & Commissioner for Justice" },
      { name: "Mrs. Titilola Akinlabi", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-housing",
    name: "Ministry of Housing",
    category: "ministry",
    description: "Handles affordable housing development, urban renewal and estate management in Lagos State.",
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630600",
    email: "info@housing.lagosstate.gov.ng",
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
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630700",
    email: "info@transport.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Frederic Oladeinde", title: "Commissioner for Transportation" },
      { name: "Mr. Olawale Musa", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-environment",
    name: "Ministry of Environment & Water Resources",
    category: "ministry",
    description: "Manages environmental regulation, water supply, waste management and climate action.",
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630800",
    email: "info@environment.lagosstate.gov.ng",
    officers: [
      { name: "Mr. Tokunbo Wahab", title: "Commissioner for Environment & Water Resources" },
      { name: "Mrs. Bimbo Salu", title: "Permanent Secretary" },
    ],
  },
  {
    id: "min-commerce",
    name: "Ministry of Commerce, Industry & Cooperatives",
    category: "ministry",
    description: "Promotes trade, industrial growth, SME development and cooperative societies in Lagos State.",
    location: "Ikeja",
    address: "The Secretariat, Alausa, Ikeja, Lagos",
    phone: "+234-1-7630900",
    email: "info@commerce.lagosstate.gov.ng",
    officers: [
      { name: "Mrs. Lola Akande", title: "Commissioner for Commerce" },
      { name: "Mr. Hakeem Seriki", title: "Permanent Secretary" },
    ],
  },

  // AGENCIES
  {
    id: "lasg-lasepa",
    name: "Lagos State Environmental Protection Agency (LASEPA)",
    category: "agency",
    description: "Responsible for environmental monitoring, pollution control and enforcement of environmental laws.",
    location: "Ikeja",
    address: "Motorways Centre, 3 Motorways Avenue, Alausa, Ikeja, Lagos",
    phone: "+234-1-4931348",
    email: "info@lasepa.gov.ng",
    website: "https://lasepa.gov.ng",
    officers: [
      { name: "Dr. Dolapo Fasawe", title: "General Manager" },
      { name: "Mr. Kunle Adebayo", title: "Deputy General Manager" },
    ],
  },
  {
    id: "lasg-lasaa",
    name: "Lagos State Signage and Advertisement Agency (LASAA)",
    category: "agency",
    description: "Regulates the outdoor advertising industry and signage in Lagos State.",
    location: "Lagos Island",
    address: "3B, Town Planning Way, Ilupeju Industrial Scheme, Lagos",
    phone: "+234-1-4510792",
    email: "info@lasaa.gov.ng",
    officers: [
      { name: "Mr. Adedamola Docemo", title: "Managing Director/CEO" },
    ],
  },
  {
    id: "lasg-lita",
    name: "Lagos Internal Revenue Service (LIRS)",
    category: "agency",
    description: "Assesses, collects and accounts for all taxes, levies and revenues due to Lagos State.",
    location: "Masha, Surulere",
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
    id: "lasg-lasura",
    name: "Lagos State Urban Renewal Agency (LASURA)",
    category: "agency",
    description: "Carries out urban renewal and slum upgrade projects across Lagos State.",
    location: "Lagos Island",
    address: "5, Femi Okunnu Estate, Lekki, Lagos",
    phone: "+234-1-7610000",
    email: "info@lasura.gov.ng",
    officers: [
      { name: "Arc. Biodun Otunba", title: "General Manager" },
    ],
  },
  {
    id: "lasg-lamata",
    name: "Lagos Metropolitan Area Transport Authority (LAMATA)",
    category: "agency",
    description: "Plans, coordinates and manages transportation in the Lagos metropolitan area including BRT and ferries.",
    location: "Lekki",
    address: "LAMATA Secretariat, Block 4, Lagos State Secretariat, Alausa, Ikeja",
    phone: "+234-1-2700800",
    email: "info@lamata-ng.com",
    website: "https://lamata-ng.com",
    officers: [
      { name: "Mr. Abimbola Akinajo", title: "Managing Director" },
      { name: "Engr. Dayo Mobereola", title: "Director General" },
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

  // PARASTATALS
  {
    id: "lasg-lbic",
    name: "Lagos State Building Investment Corporation (LBIC)",
    category: "parastatal",
    description: "Develops and manages real estate investments for the Lagos State Government.",
    location: "Ikeja",
    address: "3, Borno Way, Ebute Metta, Lagos",
    phone: "+234-1-5850001",
    email: "info@lbic.gov.ng",
    officers: [
      { name: "Arc. Gbolahan Lawal", title: "Managing Director" },
    ],
  },
  {
    id: "lasg-lswc",
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
    id: "lasg-lpha",
    name: "Lagos State Public Health Agency (LPHA)",
    category: "parastatal",
    description: "Coordinates public health programs, disease surveillance and health promotion in Lagos.",
    location: "Marina, Lagos Island",
    address: "Lagos Island General Hospital Complex, Lagos",
    phone: "+234-1-2665005",
    email: "info@lpha.gov.ng",
    officers: [
      { name: "Dr. Babatunde Lawal", title: "Executive Director" },
    ],
  },
  {
    id: "lasg-lsbic",
    name: "Lagos State Science Research and Innovation Council (LASRIC)",
    category: "parastatal",
    description: "Drives science, technology and innovation funding and policy for Lagos State.",
    location: "Yaba",
    address: "15, Broad Street, Lagos Island, Lagos",
    phone: "+234-1-2700500",
    email: "info@lasric.gov.ng",
    officers: [
      { name: "Dr. Sola Ojo", title: "Executive Director" },
    ],
  },
  {
    id: "lasg-lasu",
    name: "Lagos State University (LASU)",
    category: "parastatal",
    description: "State-owned university providing tertiary education in science, arts, law and management.",
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
    id: "lasg-lisgis",
    name: "Lagos State Geographic Information Systems (LAGIS)",
    category: "parastatal",
    description: "Manages geographic data, land registration, and GIS mapping services for Lagos State.",
    location: "Alausa, Ikeja",
    address: "Land Bureau Complex, Alausa Secretariat, Ikeja, Lagos",
    phone: "+234-1-4939000",
    email: "info@lagis.gov.ng",
    officers: [
      { name: "Mr. Olajide Babatunde", title: "Director General" },
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
