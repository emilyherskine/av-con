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
