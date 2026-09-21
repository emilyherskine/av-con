import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HeroSection from "../CommonComponents/HeroSection/HeroSection";
import Speaker from "./speaker";
import "./speakers.css";
import GOC from "./PastSpeakersArchive/PresenterSpeakerImages2024/GOC.jpg";
import GOCHighlight from "./KeyNoteSpeaker/GOCHighlight";

import AllyGarvey from "./PresenterSpeakerImages2026/Ally.JPG";
import AlexMerkelCarroll from "./PresenterSpeakerImages2026/AlexMerkelCarroll.png";
import MaryHennigan from "./PresenterSpeakerImages2026/MaryHennigan.jpg";
import MatthewGee from "./PresenterSpeakerImages2026/MatthewGee.jpg";
import FahadIbneMasood from "./PresenterSpeakerImages2026/FahadIbneMasood.JPG";
import AnthonyAttoumani from "./PresenterSpeakerImages2026/AnthonyAttoumani.png";
import PatriciaMoore from "./PresenterSpeakerImages2026/PatriciaMoore.jpg";
import MuireannBagley from "./PresenterSpeakerImages2026/MuireannBagley.jpg";
import DiarmuidORiordan from "./PresenterSpeakerImages2026/DiarmuidORiordan.jpg";
import TimothyKelly from "./PresenterSpeakerImages2026/TimothyKelly.png";
import JohnDrysdale from "./PresenterSpeakerImages2026/JohnDrysdale.jpeg";
import MarkFitzgerald from "./PresenterSpeakerImages2026/MarkFitzgerald.png";
import NicholasBrereton from "./PresenterSpeakerImages2026/NicholasBrereton.jpeg";
import MichelOrsi from "./PresenterSpeakerImages2026/MichelOrsi.png";
import HannahDennison from "./PresenterSpeakerImages2026/HannahDennison.jpg";
import OlivierNiel from "./PresenterSpeakerImages2026/OlivierNiel.png";
import LauraSavage from "./PresenterSpeakerImages2026/LauraSavage.jpg";
import ViktoriiaIvannikova from "./PresenterSpeakerImages2026/ViktoriiaIvannikova.jpg";
import CiaranOCallaghan from "./PresenterSpeakerImages2026/CiaranOCallaghan.png";
import SamanthaHarding from "./PresenterSpeakerImages2026/SamanthaHarding.jpg";
import FaycalSassi from "./PresenterSpeakerImages2026/FaycalSassi.png";
import GerryHumphreys from "./PastSpeakersArchive/PresenterSpeakerImages2024/GerryHumphreys.jpg";
import PhilipSmythe from "./PastSpeakersArchive/PresenterSpeakerImages2025/PhilipSmythe.jpg";
import DeirdreOReilly from "./PresenterSpeakerImages2026/DeirdreO'Reilly.jpg";
import GraceDelaney from "./PresenterSpeakerImages2026/GraceDelaney.jpeg";
import SolGianoutsos from "./PresenterSpeakerImages2026/SolGianoutsos.jpeg";
import MaireKerrigan from "./PresenterSpeakerImages2026/MaireKerrigan.jpeg";
import PaulKennedy from "./PastSpeakersArchive/PresenterSpeakerImages2024/PaulKennedy.jpg";
import MarinaEfthymiou from "./PresenterSpeakerImages2026/MarinaEfthymiou.jpg";
import JarlathMolloy from "./PresenterSpeakerImages2026/JarlathMolloy.jpg";

const defaultPresenters = [
  {
    image: AllyGarvey,
    name: "Ally Garvey",
    bio: "Working within the fashion and media industry for over 15 years, Ally Garvey thrives on delivering the latest showbiz news and the Hottest topics to a wide audience. Ally has worked on live tv for over a number of years now on a range of different broadcasting stations where quick thinking and wide range of conversational skills are a must. Ally's favourite environment to work in is a live audience, she loves to engage with co. presenters and the audience. Check out Ally's instagram page to get a glimpse of the many different events both on screen and off screen she has worked on.",
  },
];

const defaultSpeakers = [
  {
    image: MaryHennigan,
    name: "Mary Preud'homme (nee Hennigan)",
    bio: "Mary Preud'homme (nee Hennigan) has more than 20 years of international aviation experience spanning flight operations, aircraft maintenance, technical services, and business development. She is the Co-Founder and Managing Director of Altura Aviation Group, an Irish-based technical services company established in 2026 that has successfully delivered pre-purchase inspections worldwide, alongside a full range of aircraft transition and compliance services. Mary began her aviation career as a flight instructor in Ireland before becoming a commercial airline pilot with ASL Airlines Switzerland, operating ATR-42 and ATR-72 aircraft. She later joined Jet Aviation Basel, where she managed Part 145 business jet maintenance projects and led aircraft pre-purchase inspections, building expertise in regulatory compliance, aircraft records, and MRO operations. After working at Jet Aviation she successfully co-founded Air Doc Services (ADS) in Switzerland where she was Managing Director until 2026. Mary is also Safety Manager and Director of Business Development at Paramount Global Ferry Services, moving aircraft worldwide for aircraft lessors and owners. Mary is spearheading international expansion, managing high-value contracts with global clients while ensuring Paramount operates to the highest safety standards. Mary holds a Diploma in Continuing Airworthiness Management and enjoys flying for fun when she find the time. She is a member of EBAA, Board Member at IBGAA, and a member of Women in Aviation International (WAI).",
  },
  {
    image: MatthewGee,
    name: "Matthew Gee",
    bio: "Matthew Gee, Head of Flight Operations, Six West | Principal, MG Aviation Consultancy. With over 30 years of comprehensive experience across the aviation landscape, Matthew is a professional, specialising in flight operations, regulatory compliance, and consultancy. He currently serves as the Head of Flight Operations at Six West, where he oversees complex operations for large transport aircraft on behalf of global lessors and airlines. Parallel to this role,, Matthew founded MG Aviation Consultancy, which provides auditing and expert witness services to the industry. His career spans the full industry lifecycle: from general aviation, flight training, and ground handling, to working in operations control at Aer Lingus, Aer Arann and First Choice Airways. Matthew then moved, into the aircraft leasing sector, to head up the ferry flight services department at a large technical service provider.  A licensed pilot with experience in turbine-powered aircraft, Matthew is also a qualified Senior and Lead Auditor, as well as an IS-BAO and IS-BAH auditor for IBAC. His industry experience is frequently sought in legal proceedings, globally. ",
  },
  {
    image: FahadIbneMasood,
    name: "Fahad ibne Masood",
    bio: "Fahad ibne Masood is a Faculty member in Aviation Technology and the Part 147 Exams Manager at Technological University Dublin (TU Dublin). He has over 27 years of international aerospace experience spanning flight operations, safety risk management, and emerging technologies. As a rated flight instructor and pilot with extensive flight operations experience, Fahad flew jet aircraft before specializing in aviation safety risk management, human factors, and accident investigation. In recent years, his focus has shifted to Advanced Air Mobility (AAM), AI, Quantum Computing and airspace modernization. He leads strategic advisory projects and collaborates with regulators and international bodies—including ICAO, the RAeS, and ISASI—on eVTOL integration and next-generation airspace risk management. Fahad holds an MBA, an M.Phil, and is a Member of the Royal Aeronautical Society (MRAeS).",
  },
  {
    image: AnthonyAttoumani,
    name: "Anthony Attoumani",
    bio: "Anthony is a passionate and senior aeronautical engineer with over 15 years of experience in the design, development, qualification and certification of aviation products. After graduating a Master Degree in Aerospace Engineering, option Avionics and Mechatronics, Anthony commenced my career in Airbus Group as Reliability Availability Maintainability and Safety Engineer. Subsequently, he progressed to management roles including Head of Design Process or Overall Cabin Design Chief Engineer in ATR, Vice President Engineering Business Development in Eirtech and Head of Design Organisation in Atlantic Aviation Group. This allowed him to deal with projects in more than 20 Countries including most European Countries, North America, Brazil, UAE, China, India, Japan, Australia. Throughout his career, Anthony had the opportunity to work on numerous Minor and Major Changes (Supplemental Type Certificates) going from basic cabin reconfigurations for Airlines, to complex conversions into Maritime Patrol Aircraft for MoD's. After dealing with both Technical and Commercial aspects of the Aviation Industry, and being able to rely on a large network of Aviation Partners, it made sense for him to set up his company: Infinity Aviation Support. As Chief Executive Officer, Anthony aims to support Aviation Stakeholders and ensure successful completeness of all their projects.",
  },
  {
    image: PatriciaMoore,
    name: "Patricia Moore",
    bio: "Dr Patricia Moore is Co-founder and Director of the Irish Space Association (ISA), an industry-led cluster advancing the development of Ireland’s rapidly growing space sector. She is also Managing Director of Promethio, a Dublin-based technology and consultancy company that works with clients and partners in emerging and deep-tech sectors, with a focus on organisations developing or applying space-based systems and services. Patricia’s career spans both industry and academia. She has previously served as CTO of the space technology and business development consultancy Mindseed, and as an Assistant Professor in the School of Electronic Engineering at Dublin City University (DCU). She holds both a PhD and a BEng in Engineering from DCU.",
  },
  {
    image: AlexMerkelCarroll,
    name: "Alex Merkel Carroll",
    bio: "Alex Merkel Carroll is a 16-year-old from Ireland with a passion for aviation and a goal of becoming an airline pilot. Through his TikTok account, @Alex | Aviation, he shares his aviation journey with more than 40,000 followers by creating vlogs, flying videos and aviation content. Alex is currently completing the WINGS course at the National Flight Centre, where he is flying the Cessna 152. Alongside his flight training, he has been involved with a range of organisations across the aviation industry, including Emerald Airlines, AirNav Ireland, Universal Aviation, Airline Flight Academy, Atlantic Flight Training Academy (AFTA), Dublin Airport and Cork Airport. Alongside flying, Alex enjoys creating social media content that gives people an insight into aviation and highlights the many opportunities available within the industry. After finishing school, Alex hopes to join an airline cadet programme while also exploring other routes into aviation and working towards his goal of becoming a commercial pilot.",
  },
  {
    image: MuireannBagley,
    name: "Muireann Bagley",
    bio: "Muireann Bagley is a 6th-year student with her sights firmly set on a career in the skies. After her first flying lesson at just 11 years of age, she set herself the goal of earning her Private Pilot’s Licence during her TY year. She passed all written exams on the first attempt with a 95% average grade and completed her PPL flight test at Navan Airfield on her 17th birthday, the earliest possible date, becoming one of Ireland’s youngest private pilots. She earned a Delta Air Lines scholarship to the National Flight Academy Summer Camp in Florida, and during TY she graduated from DCU’s Early University Entrance Engineering programme. She also attended the Centre for Talented Youth Ireland in DCU and explored courses from aeronautical engineering to advanced maths. When not in the cockpit, Muireann can usually be found on the golf course — though she admits her landings are better than her putting. At Avcon, Muireann will share her journey from the classroom to the cockpit, and her top tips for aspiring young aviators.",
  },
  {
    image: DiarmuidORiordan,
    name: "Diarmuid O'Riordan",
    bio: "Diarmuid began his aviation career in the Irish Air Corps, where he qualified as an Aerodrome, Approach, and Air Intercept Controller. He later became an instructor and examiner across all ATC endorsements in the military. During his service with the Defence Forces (DF), Diarmuid completed a Master of Business Administration (MBA), graduating with first-class honours in all 18 course modules. He was awarded both the gold medal for top graduate and a special University President’s Award for academic excellence. He subsequently served as Officer Commanding of the Air Corps' Air Traffic Control Squadron—a position he held for almost five years before retiring from the Defence Forces. Shifting his focus to his flying career, he joined Aer Lingus as a pilot. After several years in an operational flying role, he progressed into the airline’s training department, serving as a Type Rating Instructor (TRI) and Crew Resource Management Instructor (CRMI) on the Airbus A320. He operated both medium and long-haul routes before transitioning to the Airbus A330 for long-haul operations. During a five-year career break from Aer Lingus, Diarmuid returned to ATC in Switzerland, becoming an ATC instructor and examiner before being appointed Head of Training Delivery and Chief Instructor at Skyguide—Switzerland’s Air Navigation Services Provider. Skyguide provides both civil and military air traffic control and air navigation services across Switzerland and adjacent parts of neighbouring countries. With over 1,500 employees at 14 locations, the organisation manages approximately 1.2 million civil and military flights each year through some of Europe’s most complex airspace. While working at Skyguide, Diarmuid continued to fly and remained an active Airbus A330 Captain and instructor on both the A320 and A330. Initially flying global A330 cargo operations during the COVID-19 pandemic, he later transitioned to passenger services for a wide range of airlines and charter partners, including Surinam Airways, Air Senegal, SpiceJet, Windrose, Saudia, Tunisair, TUI, Chapman Freeborn, DHL, and Amazon. This phase of his flying career brought him to destinations he had never imagined: from taking off in 45°C heat in Saigon, Medinah, Jeddah, and Hanoi, to landing in -45°C conditions in Fairbanks and Anchorage, Alaska. He spent months flying routes across Korea and weeks enduring deep winter in Alaska in both Fairbanks and Anchorage. Fuel stops included Turkmenistan, with cargo operations extending to places like Tijuana. Notable flights included transporting Kanye West’s Choir group from Los Angeles to Paris, carrying special cargo from Cambodia to Washington Dulles via Tbilisi, and operating troop transport flights to Africa for the British Army. He flew cargo missions from Ukraine, operating routes connecting Hong Kong, New York JFK, and Kyiv. His flying logbook includes operations from nine different airports in China, four in India, and three in Saudi Arabia, as well as missions to Mexico, Alaska, Korea, Georgia, Romania, Nigeria, Senegal, Tunisia, Vietnam, Kenya, Suriname, the USA, and Canada. Operating in unpredictable and often austere environments in both A330 and A320—with manual loadsheets and variable schedules—each day presented new challenges and deeply rewarding flying experiences. Diarmuid is also the founder of ASG, an EASA-approved training organisation. Since its establishment in 2015, ASG has built a strong reputation for delivering high-quality training and consultancy services. In addition to training hundreds of airline pilots, ASG provides a broad range of specialised aviation training and bespoke consultancy solutions to clients including Aer Lingus, Norwegian Air, SAS (Scandinavian Airlines), the Irish Coast Guard (IRCG), Aramark, the Irish Air Corps, Hospital Helipads, ASL Airlines, Aluminium Offshore, Hibernian Airlines, SkyMates Flight Academy, Global Flight Training Solutions (GFTS), DAS Private Jets, An Garda Síochána (Irish Police), Ernst & Young, Catraeus Aircraft, and CityJet, among many others.",
  },
  {
    image: TimothyKelly,
    name: "Timothy Kelly",
    bio: "Timothy Kelly is the founder and Managing Director of Corballis Technologies, an Irish software company specialising in safety, risk and compliance management systems for aviation, defence and other safety-critical sectors. A software engineering graduate of Dublin City University (DCU), Timothy began his career in aviation with FLS Aerospace and SR Technics in Ireland. He later joined the Aerospace Psychology Research Group at Trinity College Dublin, where his work developed his expertise in human factors, organisational culture, risk management and change management. In 2010, Timothy founded Corballis Technologies and has since led the delivery of enterprise software projects across aviation, defence, border security, law enforcement and the Architecture, Engineering and Construction sectors. He has also contributed to research and development projects funded by the European Union and the European Defence Agency. Since 2019, Corballis has supplied the Irish Air Corps with an integrated safety and compliance management system supporting requirements and frameworks including ICAO, EASA, ARMS, health and safety and ISO standards across multiple departments. Timothy's work sits at the intersection of aviation, technology and human factors, shaped by over a decade building safety-critical systems for defence and aviation organisations.",
  },
  {
    image: JohnDrysdale,
    name: "John Drysdale",
    bio: "John Drysdale is a leading aviation consultant, aircraft maintenance engineer, and pilot advocate who has built a diverse career spanning airlines, maintenance hangars, airports, and aircraft leasing. As Director of Annadale Aviation and Senior Advisor to the Emerald Aero Group, John works with businesses across Ireland and internationally to drive growth and technical excellence across the aerospace sector. John’s journey highlights how practical skills and continuous learning open doors across the entire aviation ecosystem. He holds an EASA Category B1 Aircraft Maintenance Licence, graduated from the Technological University of the Shannon (TUS) Aviation Technical Certificates series, and earned a First-Class Honours BSc in Aviation Leadership from Dublin City University (DCU) in 2021. A Fellow of the Royal Aeronautical Society and Vice Chairman of Limerick Flying Club, John is also actively pursuing his Private Pilot Licence (PPL), proving that no matter how far your career takes you, there is always a new sky to explore.",
  },
  {
    image: MichelOrsi,
    name: "Michel Orsi",
    bio: "Michel Orsi is an accomplished aerospace operations leader with 35+ years of experience in helicopter engineering, global maintenance, and field support. As Head of Operations at Airbus International Services, he leads 60+ technicians across the world , driving field technical assistance, regulatory compliance, and a €12M operational budget. Michel built his career from the ground up at Aerospatiale and Eurocopter. Starting as a mechanical fitter and prototype designer, he advanced to Field Service Engineer, providing critical technical assistance across the world . He later served as a Field Service Representative, interfacing directly with military fleets on major upgrade programs. A certified auditor with background in mechanical engineering design and production, Michel combines deep technical precision with strategic management. He is recognized for his leadership in high-stakes, multicultural environments and his dedication to global aviation safety",
  },
  {
    image: MarkFitzgerald,
    name: "Mark Fitzgerald",
    bio: "Mark Fitzgerald is a seasoned aviation executive and licensed engineer with nearly 30 years of industry experience, including over a decade in senior leadership roles. He currently serves as Head of Safety, Quality, and Business Excellence at Airbus International Services, leading safety management systems (SMS), quality assurance, and compliance monitoring across complex operational environments. Mark started his career in the Irish Air Corps and went on to hold key regulatory leadership roles—including Deputy Accountable Manager, Group Safety and Quality Coordinator, and Head of Consulting—for major organizations such as CHC Ireland, Starlite Aviation, and Irish Helicopters. He was also a Director at CHC Leasing and served on Irish Government Search and Rescue (SAR) aviation working groups.  Mark holds an Executive MBA from Dublin City University (DCU), an Honours Degree in Business Studies (Aviation & Emergency Services), and an EASA/IAA Part 66 B1.3/C aircraft maintenance licence. He is currently completing a Master’s in Managing Risk and System Change at Trinity College Dublin.",
  },
  {
    image: NicholasBrereton,
    name: "Nicholas Brereton",
    bio: "Dr Nicholas J.B. Brereton is an Ad Astra Fellow and Assistant Professor within the School of Biology and Environmental Science at University College Dublin. He is Space life sciences lead at the UCD Centre for Space Research. His research tries to understand genetics at the interface of human, animal, plant, and environmental microbiomes, with a focus on clinical, agricultural and environmental challenges. In the space sciences, he has contributed to genetic studies associated with the ISS, Mars500, Inspiration4 and Axiom Mission 1 (Ax-1). Inspiration4 was the first all-civilian orbital spaceflight, while Ax-1 was the first all-private astronaut mission to the ISS. He is also an active member of the Open Science community, with membership of NASA OSDR Analysis Working Groups for Regolith, Microbes, Multiomics and Planetary Protection. This ongoing research helps advance our understanding of astronaut health, microbial resilience and environmental microbiology under extreme conditions. More recently his team led analysis of the Rodent Research-6 mission, looking into spaceflight effects on mouse genetics and gut microbiome interactions. He currently leads two ESA-funded projects, MARSCROP and RadioBiome, both focusing on understanding how life responds to the stresses of space, but which also help translate space discoveries to inform radiotherapy treatment and smart agriculture on Earth.",
  },
  {
    image: HannahDennison,
    name: "Hannah Dennison",
    bio: "Currently Programme Chair for the B.Eng. Tech in Aviation Technology at TU Dublin, with a decade of industry experience within CAMO engineering, safety management and more recently, academia. Her operational expertise from ASL Airlines Ireland, where she held senior engineering and safety leadership roles, including Fleet Principal Engineer for the B757 and Airbus fleets (A330/A300), Deputy Safety Manager for the AOC, and nominated Post-Holder for CAMO Safety Manager. Before joining ASL, she worked in helicopter operations with Starlite Aviation, where she gained exposure to continuing airworthiness management and P-145 maintenance organisation operations, providing her with invaluable hands-on experience. She holds an MSc in Human Factors in Aviation Engineering from Coventry University and a Postgraduate Diploma in Aviation Maintenance Management from the University of Limerick. Her experience brings a blend of frontline engineering, safety leadership, and academic insight, which she would love to share with students.",
  },
  {
    image: OlivierNiel,
    name: "Olivier Niel",
    bio: "Olivier Niel is the Managing Director of Airbus International Services, based in Dublin, Ireland. In this role, he leads global operations and maintenance support networks for the division. Olivier has built a 20+ year career at Airbus Helicopters and Eurocopter. Most recently, he served as Head of Industrial Operations for the Military Support Center France, where he directed a 200-person team managing helicopter maintenance, overhauls, and safety programs—notably driving a 20% turn-around time improvement for NH90 inspections. His expansive background also includes leadership roles as Head of Mechanical Flight Control & Hydraulics, Product Engineering Manager, and Head of Blade Design, where he successfully guided civil aircraft through EASA certification. He holds a Master’s in Aeronautical Maintenance and a Post-graduate Degree in Composite Materials from Bordeaux University. Outside the office, Olivier is an active private pilot with a passion for aerobatics, running, fencing, and surfing.",
  },
  {
    image: LauraSavage,
    name: "Laura Savage",
    bio: "Laura is an aviation trading and investment executive with more than a decade of experience originating, negotiating and executing complex aircraft transactions across global secondary markets. She is currently Senior Vice President of Trading at TrueAero, where she leads acquisitions, disposals and portfolio optimisation initiatives that support platform growth and drive asset value creation. Prior to joining TrueAero, Laura held a number of operational and commercial roles at Bocomm Leasing, including Vice President of Trading, following the start of her career in Financial Services Tax at KPMG. Laura brings a multidisciplinary perspective spanning aviation finance, aircraft lease management, law, tax and accounting. She is a Chartered Accountant (ACA) and Chartered Tax Advisor (CTA), and holds a First Class Executive MBA from Trinity College Dublin and a Master of Accounting from UCD Michael Smurfit Graduate Business School. She also holds a First Class BA in Law and Accounting from the University of Limerick, together with specialised qualifications in Aviation Lease and Finance, Aircraft Lease Transition Management, Aircraft Engine Management and executive leadership. In 2025, Laura was recognised as one of Airline Economics’ 40 Under 40.",
  },
  {
    image: ViktoriiaIvannikova,
    name: "Viktoriia Ivannikova",
    bio: "Dr Viktoriia Ivannikova is an aviation academic, researcher and educator with almost 20 years of international experience spanning aviation management, airport planning, research and higher education leadership in Ireland and Ukraine. She is an Assistant Professor in Aviation Management and Programme Chair for the BSc in Aviation Management with Pilot and Air Traffic Controller Studies at DCU Business School, where she works closely with industry to connect aviation education, research and practice. Prior to joining DCU, Viktoriia held senior academic and leadership positions at the National Aviation University of Ukraine, including Associate Professor, Deputy Head of School, Programme Chair for BSc and MSc programmes in Air Transportation Management, and Director of Education in English. She holds a PhD in Air Transportation Systems and Bachelor's and Master's degrees in Civil Engineering, specialising in Airport Design and Planning. Her research focuses on airport planning and management, airport-cities, digital transformation, innovation and the future of aviation. A Senior Fellow of Advance HE (SFHEA) and Fellow of the Royal Aeronautical Society (FRAeS), Viktoriia is also an External Examiner at Cranfield University and serves on the Executive Committees of the University Transport Study Group (UTSG) and the European Aviation Conference Institute (EACI).",
  },
  {
    image: CiaranOCallaghan,
    name: "Ciarán O’Callaghan ",
    bio: "Ciarán O’Callaghan is an Aeronautical Engineer and lecturer with over 30 years’ experience in aviation from MRO’s, aircraft leasing, drones and more recently as an academic in TU Dublin. At present, Ciarán is a faculty member of the Faculty of Engineering, Built Environment and Apprenticeships lecturing on the Aviation Technology program. A licenced engineer (B1.3), he also holds an B’Eng in Aeronautical Engineering (Hons), a PG Cert in Technology Management and an MSc in Space Science and Technology. Ciarán started his career in the Air Corps but has also branched out into other sectors of aviation. Prior to joining TU Dublin, he held senior roles in the drone industry as a Flight-Testing Program Manager (Manna) and Head of Aviation and Accountable Manager (A-techsyn). A highlight for Ciarán took place recently during the August 12th Eclipse where he took to the air on an international expedition alongside researchers from DIAS, TCD, INAF, ESA and the Irish Air Corps to image and capture data on the sun’s corona while in totality. A keen astronomer, he got to blend his aviation and astronomy skills to help build what was a very successful expedition!",
  },
  {
    image: SamanthaHarding,
    name: "Samantha Harding",
    bio: "Samantha Harding is the founder of the SILC Conference and has spent the past twelve years working to advance Ireland’s aviation industry. She has played an important role in strengthening collaboration across the aviation community, bringing key stakeholders together and championing Ireland’s position as a global centre for aviation and aircraft leasing. Samantha holds a Master’s degree in Financial Economics and a Specialist Diploma in Aviation Leasing and Finance.",
  },
  {
    image: FaycalSassi,
    name: "Fayçal Sassi",
    bio: "Fayçal Sassi is an aviation technology and cybersecurity leader with over 18 years of experience in the industry. His career has progressed from Systems Administration to IT Management and ultimately to Head of IT & Cybersecurity at Airbus Ireland, where he now leads the organisation’s IT strategy, governance, digital transformation, cybersecurity and IT operations across a multinational environment. Throughout his career, Fayçal has led major technology and transformation initiatives, from modernising IT infrastructure and implementing enterprise platforms to integrating Artificial Intelligence and strengthening cybersecurity resilience in response to an evolving regulatory and threat landscape. He holds an Executive MBA (Hons) from Dublin City University, serves as a Board Director of the MBA Association of Ireland, and is commencing doctoral research at Dublin City University exploring how organisations can move beyond the AI hype to create sustainable business value through AI-driven digital transformation and strategic leadership. In 2025, he was recognised among the Global CISO 100 by Trellix for his contribution to cybersecurity leadership. Passionate about leadership, innovation and the future of aviation, Fayçal shares practical insights at the intersection of technology, cybersecurity, business and people.",
  },
  {
    image: GerryHumphreys,
    name: "Gerry Humphreys",
    bio: "Gerry is an accomplished aviator with over 40 years of experience, 14,000 flying hours logged on more than 120 different aircraft types. After completing a degree in Aeronautical Engineering at Queen's University Gerry spent 20 years in the RAF, where he primarily flew single-seat fast jets such as the Hunter, Hawk, and Harrier. After leaving the RAF, Gerry transitioned to corporate aviation for 10 years, during which time he also constructed a runway at his home, built an aircraft, performed in air displays, and became a certified flying instructor. Currently, Gerry serves as the Deputy Head of Training, where he is responsible for upholding the highest standards in all aspects of pilot training. He also leads instruction in aerobatics, tailwheel conversions, and Upset Recovery and is an EASA flight examiner. Additionally, Gerry is a board member of the Foynes Flying Boat and Maritime Museum and serves as the Chairman of the General Aviation Safety Council of Ireland."
  },
  {
    image: PhilipSmythe,
    name: "Philip Smythe",
    bio: "Philip has a life long interest in aviation a former commercial and corporate pilot, Philip has been a flight instructor for over 40 years. Captain Smythe has been with AFTA since its inception in 1995, training pilots at all levels from Private Pilots Licence (PPL) to Commercial Pilots Licence (CPL) and Multi-Engine Instrument Rating qualifications. As Safety Manager, Philip conducts internal safety audits and promotes, maintains and oversees flight safety and best practices on a daily basis. Philip is an Irish Aviation Authority (IAA) certified Flight Examiner. He has witnessed a growing focus on environmental sustainability in the aviation industry over his time with the business.",
  },
  {
    image: PaulKennedy,
    name: "Paul Kennedy",
    bio: "Paul Kennedy is the Head of Aviation Infrastructure for the Irish Aviation Authority, with 30 years of aviation experience. He holds an air traffic controller's license, commercial pilot's license, and an MSc in Human Factors and Safety Assessment in Aeronautics from Cranfield University. Starting with the Irish Aviation Authority in 1994, Paul gained extensive expertise in Air Traffic Control (ATC), serving as an officer, instructor, and investigator. In 2009, he transitioned to regulation, becoming an air traffic services inspector and later managing the Air Navigation Services Division. In 2023, he was appointed Head of Aviation Infrastructure, overseeing the regulation of Air Traffic Management, Air Navigation Services, and Aerodromes. Paul chairs the ICAO European Region Aerodrome Operations Working Group and the EU National Supervisor Committee Coordination Platform. He is also Vice Chair of the ICAO North Atlantic Safety Oversight Group and has participated in EASA ATM/ANS Standardisation Inspections since 2012.",
  },
  {
    image: DeirdreOReilly,
    name: "Deirdre O'Reilly",
    bio: "Deirdre O'Reilly is currently the Training Coordinator for Skypeople Training EU and has many years of experience in the aviation industry. She worked as a Cabin Crewmember with Aer Lingus for 20 years, flying all routes and aircraft as a Senior Cabin Crewmember. She spent 10 of these years working in the Flight Services Training Department, where she instructed in SEP, CRM, Dangerous Goods, Security, First Aid, Senior Training, Flight Crew Training, Initial Cabin Crew Training and Customer Service Training. Towards the end of her career, Deirdre became the Chief Instructor/Training Supervisor. In this role, she helped ensure that the Training Academy ran smoothly, overseeing administration, instructor rosters, instructor qualifications, trainee standards and regulatory standards. She also designed and delivered a Cabin Crew introductory course for Portobello Institute in Dublin. In her current role with Skypeople Training EU, Deirdre helps coordinate EASA Attestation courses, which are delivered internationally. She has also designed two TY courses, which are delivered to schools nationally by her team of experienced instructors.",
  },
  {
    image: GraceDelaney,
    name: "Grace Delaney",
    bio: "Grace Delaney is 23 years old and first became interested in aviation as a teenager. After completing her first discovery flight, it sparked her passion for flying. She went on to study Aviation Management at Dublin City University before deciding to take the next step and pursue a career as a pilot. Grace began her pilot training with AFTA in August last year. She completed her ATPL exams this summer and is currently working towards completing the final stages of her PPL.",
  },
  {
    image: SolGianoutsos,
    name: "Sol Gianoutsos",
    bio: "Sol Gianoutsos was born in Wellington, New Zealand, and grew up around the world, giving him a slightly distinctive accent. He has been interested in aviation for as long as he can remember. Growing up around one of the windiest airports in the world probably didn’t hurt either. He really caught the aviation bug when his parents gave him a discovery flight for his 15th birthday, and he has been flying ever since. In fact, he managed to obtain his PPL before he even got his driver’s licence. Sol is currently working at AFTA as a Flight Instructor through the VistaJet Mentored Programme, where he has had the opportunity to teach students like Grace, as well as hopefully some future students, how to fly. Excitingly, Sol will be starting with VistaJet shortly after the event, and he looks forward to sharing more about his journey, the industry, and what comes next."
  },
  {
    image: MaireKerrigan,
    name: "Máire Kerrigan",
    bio: "Máire Kerrigan brings over a decade of financial expertise to her role as Head of Finance at Airbus International Services. Having advanced through key accounting positions across both the non-profit and corporate sectors, she now oversees end-to-end financial operations, risk, governance, and system innovations. In doing so, she demonstrates that finance is far more than a behind-the-scenes function, it is a strategic engine driving the aerospace industry forward. Her strong educational background includes a First-Class Honours degree in Corporate Law and a Postgraduate Law degree from NUI Galway, alongside her ACCA professional accreditation. Passionate about inspiring the next generation, Máire encourages students pursuing careers across finance and aviation by showing firsthand how diverse analytical backgrounds can lead to high-impact leadership roles in aerospace."
  },
  {
    image: MarinaEfthymiou,
    name: "Marina Efthymiou",
    bio: "Prof. Marina Efthymiou is Professor of Aviation Management at Dublin City University Business School, where she leads the Sustainable Aviation Hub of the Institute of Business and Society. She has published over 60 academic papers and advised bodies including the Department of Transport (Ireland), OECD ITF, European Commission, and European Parliament, and she comments regularly for Bloomberg, BBC, CNN, RTE and Politico. An IATA instructor and Principal Investigator on the EC-funded MSCA project AZER02050, she has held visiting professorships in Beijing, Singapore, and Riyadh. Her accolades include the aviation industry's Women in Aviation award (2025), the DCU Business School Young Research Award (2023), and the DCU President's Award for Distinctive Approach to Innovation in Teaching (2022).",
  },
  {
    image: JarlathMolloy,
    name: "Jarlath Molloy",
    bio: "Dr Jarlath Molloy has over 20 years’ experience working on ESG and sustainability issues across the public, private and non‑profit sectors, with professional experience in multiple countries. His work and interests focus on climate risk, sustainable finance, decarbonisation, corporate governance and non‑financial reporting and—critically—how these domains intersect in real decision‑making contexts. His career both inside and beyond the aviation sector has given him a broad, systems‑level perspective on the shared sustainability challenges facing industry, capital markets and governments alike and on the practical constraints that often limit effective action. In 2025, he took up the role of Head of Aviation Sustainability at the Irish Aviation Authority (IAA). In this role, he is responsible for the environmental elements of ReFuelEU, Single European Sky and Critical Entities Resilience regulations – and works closely with other competent authorities, regulated entities and stakeholders.",
  },
];

export default function SpeakersPresentors({
  presenters = defaultPresenters,
  speakers = defaultSpeakers,
}) {
  return (
    <main className="speakers-page">
      <HeroSection
        defaultTitle="Speakers and Presenters"
        defaultSubtitle="Meet the inspiring industry leaders, innovators and professionals joining AvCon 2026."
        smallScreenTitle="Speakers and Presenters"
        smallScreenSubtitle="Discover the people shaping the future of aviation and aerospace."
      />

      {/* Introduction */}

      <section className="speakers-intro">
        <p>
          AvCon 2026 brings together inspiring voices from aviation, aerospace,
          engineering, defence, drones, space, sustainability and future
          mobility.
        </p>

        <p>
          Our speakers and presenters will share their experiences, career
          journeys and insights into the opportunities shaping the industries of
          tomorrow.
        </p>

        <p>
          New speakers and presenters will be announced throughout the year.
        </p>
      </section>

      {/* ==========================
                Presenters
            ========================== */}

      <section className="speakers-section">
        <h2>AvCon Presenters</h2>

        <Box>
          <Grid container spacing={3}>
            {/* Presenters will be added when announced. */}
            {presenters.length > 0 ? (
              presenters.map((presenter, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Speaker
                    SpeakerImage={presenter.image}
                    SpeakerName={presenter.name}
                    SpeakerBio={presenter.bio}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <p className="coming-soon">
                  Presenter announcements coming soon.
                </p>
              </Grid>
            )}
          </Grid>
        </Box>
      </section>

      {/* ==========================
                Speakers
            ========================== */}

      <section className="speakers-section">
        <h2>AvCon Speakers</h2>

        <GOCHighlight
          SpeakerImage={GOC}
          SpeakerName="GOC, Brigadier General Rory O'Connor"
          SpeakerBio={`"A Welcome Note to AvCon - the Future of Aviation from the Air Corps
                        As we look ahead to the upcoming Aviation Convention hosted by the Irish Air Corps this November, we envision a groundbreaking event that celebrates the dynamic world of aviation. This convention is a milestone for the Irish Air Corps, students, schools, and the wider community.
                        The Irish Air Corps, with its tradition of excellence, courage, and innovation, is excited to welcome everyone to our base. This event is more than a gathering; it's an inspiration for the next generation of aviators, engineers, and innovators.
                        We have a stellar lineup of guest speakers, including aero engineers, pilots, technicians, and Air Traffic Controllers from the Air Corps. Their insights and experiences highlight the importance of collaboration and mentorship in aviation.
                        For students and schools, this convention offers an unparalleled opportunity to learn from the best, engage with cutting-edge technology, and envision a future where their dreams take flight. Hands-on workshops, interactive exhibits, and panel discussions are designed to ignite curiosity and foster a passion for aviation.
                        Participants will explore various aspects of aviation, from piloting and navigation to aerospace engineering and air traffic control, gaining firsthand experience and inspiration. This event also underscores the importance of STEM education in achieving their goals.
                        We extend our heartfelt gratitude to the organisers, sponsors, guest speakers, and participants. Your support makes this event possible. To the students, seize this opportunity to ask questions, explore, and dream big.
                        The sky is not the limit; it is just the beginning. Let this convention be the launchpad for your future in aviation.
                        Thank you, and enjoy the convention!" - GOC, Brigadier General Rory O'Connor`}
        />

        <Box>
          <Grid container spacing={3}>
            {/* Speakers are configured above. */}
            {speakers.length > 0 ? (
              speakers.map((speaker, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Speaker
                    SpeakerImage={speaker.image}
                    SpeakerName={speaker.name}
                    SpeakerBio={speaker.bio}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <p className="coming-soon">
                  Speaker announcements coming soon.
                </p>
              </Grid>
            )}
          </Grid>
        </Box>
      </section>
    </main>
  );
}
