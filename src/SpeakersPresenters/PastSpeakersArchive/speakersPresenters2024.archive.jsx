import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HeroSection from "../../CommonComponents/HeroSection/HeroSection";
import Speaker from "../speaker";
import KarlBoweImage from "./PresenterSpeakerImages2024/KarlBowe.jpeg";
import AllyGarvey from "./PresenterSpeakerImages2024/Ally.JPG";
import JulieGarland from "./PresenterSpeakerImages2024/JudieGarland.jpeg";
import JohnDrysdale from "./PresenterSpeakerImages2024/JohnDrysdale.jpg";
import Bobby from "./PresenterSpeakerImages2024/Bobby.png";
import KimMackenzieDoyle from "./PresenterSpeakerImages2024/KimMackenzieDoyle.png";
import IanKiely from "./PresenterSpeakerImages2024/IanKiely.JPG";
import ValentinaFitzpatrick from "./PresenterSpeakerImages2024/ValentinaFitzpatrick.png";
import GOC from "./PresenterSpeakerImages2024/GOC.jpg";
import GOCHighlight from "../KeyNoteSpeaker/GOCHighlight";
import LorcanGeraghty from "./PresenterSpeakerImages2024/LorcanGeraghty.jpeg";
import NicolaNiRiada from "./PresenterSpeakerImages2024/NicolaNiRiada.jpg";
import JaneMagill from "./PresenterSpeakerImages2024/JM.jpg";
import JasonPhelan from "./PresenterSpeakerImages2024/JasonPhelan.jpg";
import CaptPaddyLucky from "./PresenterSpeakerImages2024/CaptPaddy&Lucky.jpg";
import ElaineHarding from "./PresenterSpeakerImages2024/ElaineHarding.jpg";
import WayneDenner from "./PresenterSpeakerImages2024/WayneDenner.png";
import NealSkelton from "./PresenterSpeakerImages2024/NealSkelton.JPG";
import AnthonyAttoumani from "./PresenterSpeakerImages2024/Anthony Attoumani .jpg";
import GerryHumphreys from "./PresenterSpeakerImages2024/GerryHumphreys.jpg";
import PaulKennedy from "./PresenterSpeakerImages2024/PaulKennedy.jpg";
import RuthBagnell from "./PresenterSpeakerImages2024/RuthBagnell.jpg";
import JimGavin from "./PresenterSpeakerImages2024/JimGavin.jpg";
import EndaWalsh from "./PresenterSpeakerImages2024/endawalsh.jpeg";
import CaitrionaMurphy from "./PresenterSpeakerImages2024/CaitrionaMurphy.jpg";
import Charlie from "./PresenterSpeakerImages2024/Charlie.jpg";
import ShaneCrawte from "./PresenterSpeakerImages2024/ShaneCrawte.jpg";
import MarkDuffy from "./PresenterSpeakerImages2024/MarkDuffy.jpg";
import JamesLawless from "./PresenterSpeakerImages2024/JamesLawless.jpg";
import AntonioGonzalezGomez from "./PresenterSpeakerImages2024/AntonioGonzalezGomez.jpeg";
import AlineDecadi from "./PresenterSpeakerImages2024/AlineDecadi.JPG";
import YvonneElsorougi from "./PresenterSpeakerImages2024/YvonneElsorougi.JPG";
import LeonorGomes from "./PresenterSpeakerImages2024/LeonorGomes.png";

export default function SpeakersPresentors2024() {
    return (
        <main className="flex min-h-screen flex-col justify-between p-4 md:p-24">
                <HeroSection
                defaultTitle="Speakers and Presenters"
                defaultSubtitle="We're thrilled to introduce our dynamic duo of presenters, Ally Garvey and Karl Bowe, who will be your guides through this exhilarating journey."
                smallScreenTitle="Speakers and Presenters"
                smallScreenSubtitle="AvCon presenting an event for all things aviation"
                />
            <br />
            <br />
            <p style={{ padding: "0 5%" }}>
                Get ready to soar into the future of aviation at AvCon 2024!
                We're thrilled to introduce our dynamic duo of presenters, Ally
                Garvey and Karl Bowe, who will be your guides through this
                exhilarating journey. From the warm welcome to riveting
                interviews and captivating talks with esteemed guests from the
                aviation world, Ally and Karl will ensure an unforgettable
                experience. Stay tuned for announcements on our line-up of
                guests and talks that will keep you at the edge of your seat.
                Trust us, you won't want to miss the electrifying show we have
                in store for you.
            </p>
            <Box sx={{ padding: { xs: "0 2%", md: "0 5%" } }}>
                <br />
                <br />
                <hr />
                <br />
            </Box>
            <h5 style={{ textAlign: "center" }}>AvCon Presenters</h5>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        xl={6}
                        style={{ padding: "5%" }}>
                        <Speaker
                            SpeakerImage={KarlBoweImage}
                            SpeakerName="Karl Bowe"
                            SpeakerBio="Karl Bowe has over 10 years experience within the entertainment industry that varies from acting, modelling, hosting and presenting.
              Trained in Bull Alley, Liberties College to pursue an acting career from 2009-2013, Karl featured in some of their local productions before branching out into theatre and plays nationwide.
              In 2012, Karl joined a vocal harmony group called “Element” and made it to boot camp stages in X-Factor.
              In 2014, Karl was crowned Mr. Ireland and represented the country at that years Mr. World which was held in Torquay, England. 
              Over the years, he appeared in numerous pantos across the country as well as hosting some high profile events.
              Karl recently featured as the electrician in the “Giggly Bit” commercial for Eir broadband and is currently playing the role of “Andy” the barman in RTE's Fair City. He also does voice over work and provides the announcements on Dublin City FM."
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        xl={6}
                        style={{ padding: "5%" }}>
                        <Speaker
                            SpeakerImage={AllyGarvey}
                            SpeakerName="Ally Garvey"
                            SpeakerBio="Working within the fashion and media industry for over 15 years, Ally Garvey thrives on delivering the latest showbiz news and the Hottest topics to a wide audience. Ally has worked on live tv for over a number of years now on a range of different broadcasting stations where quick thinking and wide range of conversational skills are a must. 
                Ally's favourite environment to work in is a live audience, she loves to engage with co. presenters and the audience.
                Check out  Ally's instagram page to get a glimpse of the many different events both on screen and off screen she has worked on."
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: { xs: "0 2%", md: "0 5%" } }}>
                <br />
                <hr />
                <br />
            </Box>
            <div style={{ textAlign: "center" }}>
                <h5>AvCon Speakers</h5>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid style={{ padding: "3%" }}>
                        <Grid
                            item
                            xs={12} // Full-width on extra-small screens (mobile)
                            sm={12} // Full-width on small screens (tablet)
                            md={6} // Half-width on medium screens (laptops)
                            lg={6} // Half-width on large screens (desktops)
                        >
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
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }}> 
            <Grid container spacing={1}>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={JohnDrysdale}
                  SpeakerName="John Drysdale"
                  SpeakerBio="John, Business Development Manager at Shannon Airport Group since 2017, oversees Shannon’s Aviation Services Cluster. He mentors at IASA and advises at DCU's Aviation Industry Advisory board. As Chairperson of the UAAI, he advocates for unmanned aircraft. A licensed Aircraft Engineer with a Master’s in Aviation Leadership from DCU, John is also an IAA-approved drone pilot. He represents Shannon Airport Group on the SESAR Joint Undertaking EALU-AER project and enjoys mentoring young aviators through scouting."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={JulieGarland}
                  SpeakerName="Julie Garland"
                  SpeakerBio="Julie, Founder and CEO of Avtrain, leads Europe's top drone training and consultancy firm, setting industry standards. With a diverse background including roles as an Airline Training Captain and Barrister, she is deeply involved in drone regulation and safety, serving on boards like JEDA and JARUS. Julie's accolades include recognition in the 2023 eVTOL Insights Powerbook and awards for training excellence. Avtrain specialises in drone operations, emphasizing safety and innovation, and holds approvals from the Irish Aviation Authority for comprehensive training and certifications."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={Bobby}
                  SpeakerName="Bobby Healy"
                  SpeakerBio="Bobby began his career building video games for Nintendo. He then founded Eland (an airline tech company) which he sold to SITA. He then built CarTrawler over 15 years and led two successful LBOs for the business. For the last 4 years, he’s been building ‘Manna Drone Delivery’ – a business whose mission is to improve the world by making lightning-fast suburban deliveries affordable, green and safe. He is also a founder of Meili Technology with a mission to end the fiasco of care hire brokering."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={KimMackenzieDoyle}
                  SpeakerName="Kim Mackenzie-Doyle"
                  SpeakerBio="Kim Mackenzie-Doyle is the CEO and Founder of The B!G Idea, a non-profit empowering youth to tackle global challenges. She spearheads an innovative ed tech platform linking professionals with students. With a background in product development and community engagement, Kim fosters partnerships for educational reform across Ireland. The B!G Idea promotes real-world problem-solving and creativity, earning international acclaim. Kim’s leadership aims to empower socially conscious individuals, advocating for inclusive education and inspiring youth to pursue ambitious goals."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={IanKiely}
                  SpeakerName="Ian Kiely"
                  SpeakerBio="Ian is CEO of Drone Space Ltd (Formerly Drone Consultants Ireland), a full time drone specialist with thousands of hours flying experience, developing new concepts and sensor applications. Ian and his colleagues have won many awards including The European Space Masters, received substantial research grants while working with emergency services, military organisations, government entities and The European Space Agency. Ian has been providing advice and mentoring for many years, he loves weird and wonderful ideas that challenge the norm and is a staunch advocate of protecting the planet."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={ValentinaFitzpatrick}
                  SpeakerName="Valentina Fitzpatrick"
                  SpeakerBio="Valentina began her aviation career in 2007 as a flight attendant, later transitioning to Ramp Operations in 2018, where she found a passion for ground handling. Specializing in safety-critical operations, she manages international clients and diverse aircraft, from propeller-driven planes to Boeing 777s. Valentina founded The European Aviation Wellbeing Alliance, focusing on mental health among aviation personnel, and collaborates globally to promote safety and operational excellence. Her leadership emphasizes integrity, transparency, and wellbeing in aviation."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={LorcanGeraghty}
                  SpeakerName="Lorcan Geraghty"
                  SpeakerBio="Lorcan Geraghty is a Mechanical Engineering student at Trinity College Dublin and the founder of EirSpace, Ireland's first college-level student rocket team. EirSpace is set to represent Ireland in international competitions with projects ranging from solid-propelled rockets to bi-liquid engine rockets. Lorcan advocates for increased support for student led engineering teams across Ireland where students can get real engineering experience."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={NicolaNiRiada}
                  SpeakerName="Nicola NiRiada"
                  SpeakerBio="Nicola joined the Irish Aviation Authority (now AirNav Ireland) in 1994 and has over 30 years of operational experience. She works in Shannon as an area controller and is also an OJTI, instructor, and human factors actor. Nicola serves as the IFATCA liaison officer on the IATCA Ireland board and became the IFATCA Communications Coordinator in 2023. She is part of IFATCA's Equality, Diversity and Integration Task Force and the IFATCA 2030+ TF. Nicola focuses on recruitment and promoting the ATCO career in Ireland. She holds multiple qualifications, including diplomas, degrees, and certifications in aviation, education, literature, organisational behavior, and women's studies. "
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={JaneMagill}
                  SpeakerName="Jane Magill"
                  SpeakerBio="Jane is the co-founder and Chair of Shannon Aviation Museum, established in 2008. She is passionate about preserving aviation heritage and creating an accessible facility for youth education. Jane is also the CEO of AAV Aviation Technical Services Training, developing courses with TUS Technological University and the aviation industry. She is President of Women in Aviation International - Ireland Chapter, focusing on encouraging girls and supporting women. Jane holds an EASA Private Pilot's licence and is an active member of Limerick Flying Club."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={JasonPhelan}
                  SpeakerName="Jason Phelan"
                  SpeakerBio="Jason's love for aviation ignited when he experienced his first Airshow at Biggin Hill, London at the tender age of 3. Beginning a career in aviation in 2004 with the UK Civil Aviation Authority (CAA) as an aircraft registration administrator, he transitioned to the Flight Operations General Aviation division. Relocating to Ireland in 2012, his background paved the way for a career in aviation in Ireland and he continues to be aligned with the industry professionally and passionately as a hobby. In December 2022 he created The Adventures of Capt Paddy & Lucky. This initiative involves two teddy bears embarking on flying adventures across Ireland and beyond to support two prominent Irish charities, LauraLynn  Ireland's Children's Hospice and Dogs Trust Ireland"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={CaptPaddyLucky}
                  SpeakerName="Capt Paddy & Lucky"
                  SpeakerBio="The Adventures of Capt Paddy & Lucky's mission is to spearhead initiatives to support LauraLynn Children's Hospice and Dogs Trust Ireland. Through these adventures, we not only raise awareness and funds for two vital causes, but also bring joy and inspiration to the aviation community. The team commitment to these values is at the core of every flight and every event that we organise, reflecting a passion for aviation both in the skies and on the ground. These adventures have lead our duo becoming ambassadors for Irish Aviation."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={ElaineHarding}
                  SpeakerName="Elaine Harding"
                  SpeakerBio="Elaine Harding is a pioneering tech leader in aerospace, serving as Founder and CEO of AugmentAero. She has propelled the company to the forefront of aviation innovation by integrating augmented reality (AR) and artificial intelligence (AI) into aircraft maintenance. AugmentAero enhances safety, efficiency, and profitability with advanced technology, addressing key industry challenges like safety and the need for skilled engineers. Elaine's impact is amplified by collaborations with academic and industry partners, including the University of Southampton. As an innovator and disruptor, her leadership is shaping the future of aircraft maintenance and making a significant mark on the aviation industry."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={WayneDenner}
                  SpeakerName="Wayne Denner"
                  SpeakerBio="Wayne Denner is a seasoned expert in Online Safety, Cybersecurity, Marketing, and Communications, with over 20 years of international experience. He is a respected trainer and coach, specialising in large-scale development programs that empower individuals and organisations to protect their reputations and digital assets. Wayne has collaborated with businesses across Ireland, the UK, Europe, and the Middle East, delivering in-person and remote training. As the author of 'The Student's Guide to an Epic Online Reputation...and parents too.' and a pioneer of Ireland's first social network, Wayne is a recognized thought leader in online safeguarding and youth engagement. His insights are frequently sought by media outlets and organisations, including BBC, RTE, and the Canadian Senate. Wayne's work impacts thousands annually, including 60,000 students, along with parents, educators, and professionals. He partners with a diverse range of organisations, delivering events and training that inspire responsible online behaviour and maximize digital potential."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={NealSkelton}
                  SpeakerName="Neal Skelton"
                  SpeakerBio="Neal has been at Belfast City Airport since 2002 in various roles from Ramp Operative, Catering, working with Persons with Restricted Mobility before moving into Airfield Operations. In 2014 with several other Airports, he helped develop the National Certificate Airside Operations of which we have over 500 candidates going through the system or successfully having completed the NCAO. As chair of the Aviation Special Interest Group, Neal is passionate about training and all aspects of Airside Operations in particular the safety of employees and passengers. He's looking forward to presenting at the forthcoming Avcon event and passing on any experience he has gained in this exciting industry."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={AnthonyAttoumani}
                  SpeakerName="Anthony Attoumani"
                  SpeakerBio="Anthony is a passionate and senior aeronautical engineer with over 15 years of experience in the design, development, qualification and certification of aviation products. After graduating a Master Degree in Aerospace Engineering, option Avionics and Mechatronics, Anthony commenced my career in Airbus Group as Reliability Availability Maintainability and Safety Engineer. Subsequently, he progressed to management roles including Head of Design Process or Overall Cabin Design Chief Engineer in ATR, Vice President Engineering Business Development in Eirtech and Head of Design Organisation in Atlantic Aviation Group. This allowed him to deal with projects in more than 20 Countries including most European Countries, North America, Brazil, UAE, China, India, Japan, Australia. Throughout his career, Anthony had the opportunity to work on numerous Minor and Major Changes (Supplemental Type Certificates) going from basic cabin reconfigurations for Airlines, to complex conversions into Maritime Patrol Aircraft for MoD's. After dealing with both Technical and Commercial aspects of the Aviation Industry, and being able to rely on a large network of Aviation Partners, it made sense for him to set up his company: Infinity Aviation Support. As Chief Executive Officer, Anthony aims to support Aviation Stakeholders and ensure successful completeness of all their projects."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={GerryHumphreys}
                  SpeakerName="Gerry Humphreys"
                  SpeakerBio="Gerry is an accomplished aviator with over 40 years of experience, 14,000 flying hours logged on more than 120 different aircraft types. After completing a degree in Aeronautical Engineering at Queen's University Gerry spent 20 years in the RAF, where he primarily flew single-seat fast jets such as the Hunter, Hawk, and Harrier. After leaving the RAF, Gerry transitioned to corporate aviation for 10 years, during which time he also constructed a runway at his home, built an aircraft, performed in air displays, and became a certified flying instructor. Currently, Gerry serves as the Deputy Head of Training, where he is responsible for upholding the highest standards in all aspects of pilot training. He also leads instruction in aerobatics, tailwheel conversions, and Upset Recovery and is an EASA flight examiner. Additionally, Gerry is a board member of the Foynes Flying Boat and Maritime Museum and serves as the Chairman of the General Aviation Safety Council of Ireland."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={PaulKennedy}
                  SpeakerName="Paul Kennedy"
                  SpeakerBio="Paul Kennedy is the Head of Aviation Infrastructure for the Irish Aviation Authority, with 30 years of aviation experience. He holds an air traffic controller's license, commercial pilot's license, and an MSc in Human Factors and Safety Assessment in Aeronautics from Cranfield University. Starting with the Irish Aviation Authority in 1994, Paul gained extensive expertise in Air Traffic Control (ATC), serving as an officer, instructor, and investigator. In 2009, he transitioned to regulation, becoming an air traffic services inspector and later managing the Air Navigation Services Division. In 2023, he was appointed Head of Aviation Infrastructure, overseeing the regulation of Air Traffic Management, Air Navigation Services, and Aerodromes. Paul chairs the ICAO European Region Aerodrome Operations Working Group and the EU National Supervisor Committee Coordination Platform. He is also Vice Chair of the ICAO North Atlantic Safety Oversight Group and has participated in EASA ATM/ANS Standardisation Inspections since 2012."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={RuthBagnell}
                  SpeakerName="Ruth Bagnell"
                  SpeakerBio="Ruth Bagnell is a key figure in Irish aviation, serving as an Airworthiness Inspector with the Irish Aviation Authority. With over two decades of experience, she began her career as an aeronautical engineer from the University of Limerick, contributing significantly to aviation engineering. Ruth's passion for aviation is evident in her obtaining a Private Pilot's License, offering her valuable insights into flight operations that enhance her role in aircraft safety and compliance. As an Airworthiness Inspector, she ensures that aircraft meet strict safety standards, a responsibility she approaches with the perspective of a pilot. In addition to her technical expertise, Ruth is skilled in Compliance and Safety Management Systems, ensuring that aviation operations adhere to rigorous regulations. Her deep knowledge of International Aviation Regulation is vital in a globally connected industry. Ruth remains active in the General Aviation community, promoting knowledge exchange and fostering industry relationships, solidifying her as a respected leader in Irish aviation."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={JimGavin}
                  SpeakerName="Jim Gavin"
                  SpeakerBio="Jim Gavin is the Chief Operations Officer of the Irish Aviation Authority. A holder of an Airline Transport Pilots License, Jim joined the Irish aviation regulator in 2011 as a Flight Operations Inspector (Airlines Standards) with his last Type Rating on the Airbus A320 family of aircraft. Since then Jim has held various management positions and regulatory roles across flight operations, airworthiness, air traffic management/air navigation services, airspace, unmanned aircraft systems (drones) and aviation security. Jim has 30 years of experience in the aviation industry and is a former Commission Officer and military pilot with 20 years of service in Óglaigh na hÉireann | The Irish Defence Forces. Jim was awarded a Doctor of Philosophy (Honoris Causa) from Dublin City University and holds a BSc (Hons) in Management and Aeronautical Studies (with 1st Class Honours) and a Diploma in Management from Dublin Institute of Technology, a Diploma in Finance from City Colleges Ireland and a Diploma in Leadership from National University of Ireland, Maynooth. Jim was also awarded the Freedom of Dublin City by the Dublin City Council."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={EndaWalsh}
                  SpeakerName="Enda Walsh"
                  SpeakerBio="Enda Walsh serves as the UAS (Unmanned Aircraft Systems) Manager at the Irish Aviation Authority (IAA), where he oversees the development and regulation of drone operations across Ireland. With a deep understanding of aviation safety and emerging technologies, Walsh plays a pivotal role in shaping the regulatory framework for UAS operations, ensuring they meet the highest safety standards while fostering innovation. In his position, Walsh is responsible for managing the safe integration of drones into Irish airspace, overseeing compliance with both national and European regulations. His work includes liaising with various stakeholders, from drone operators to commercial enterprises, to promote safe and efficient UAS usage in areas such as aerial surveying, delivery services, and emergency response. Walsh's leadership is key to navigating the fast-growing drone industry, ensuring that Ireland remains at the forefront of UAS advancements while maintaining a strong commitment to public safety and airspace management."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={CaitrionaMurphy}
                  SpeakerName="Caitriona Murphy"
                  SpeakerBio="Caitriona Murphy is an accomplished aviation professional with over 23 years of experience. She reached a significant milestone early in her career, becoming a commander at just 24. Since 2001, Caitriona has held key positions at Aer Arann, Stobart Air, and Emerald Airlines, serving as First Officer, Captain, Line Training and Check Captain, TRI, TRE, and Chief Pilot. She has accumulated over 9,000 flight hours on ATR turboprops and Embraer jets, along with 2,000 hours instructing and examining commercial pilots. During her tenure, Caitriona successfully integrated Embraer aircraft onto the Stobart Air AOC and managed training for London City Steep Approach operations. As Chief Pilot and Fleet Manager, she led several operational improvements, including the introduction of Electronic Flight Bags (EFB) for the Embraer fleet. Most recently, Caitriona began her dream role as a Flight Operations Inspector with the Irish Aviation Authority, where she remains dedicated to advancing within the aviation sector, developing new skills, and embracing challenges in her field."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={Charlie}
                  SpeakerName="Charlie O'Neill"
                  SpeakerBio="Charlie O'Neill is currently the Chairperson of the renowned Irish Aviation Students Association (IASA) and in her final year of studying Aviation Management at Dublin City University to graduate in 2025. The Irish Aviation Students' Association (IASA) is a non-profit organization aimed at supporting and connecting students and young professionals interested in the aviation and aerospace industries in Ireland. Founded by students for students, IASA provides a platform for networking, learning, and career development in these fields, and works to bridge the gap between education and employments in the flourishing Irish aviation industry."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={ShaneCrawte}
                  SpeakerName="Shane Crawte"
                  SpeakerBio="Shane, VP Technical Asset Management - Aviation Advisory Grant Thornton Ireland leads the technical department in Grant Thorntons dedicated advisory team. Grant Thorntons Aviation Lease Service department manage the leases for over 1000 MSN over several large lessors. Prior to Grant Thornton Shane had over a decade of experience in both military and civilian operations, working with rotary and fixed-wing aircraft. Before joining the Aviation Advisory team at Grant Thornton Ireland, he served as the technical team lead in a Powerplant overhaul shop, holding full Part 145 approval for various engine models."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={MarkDuffy}
                  SpeakerName="Mark Duffy"
                  SpeakerBio="Mark Duffy is Ryanair's Director of Talent & is responsible for all things recruitment, talent, retention & communications.  Mark has been working at Ryanair since 2015 and during that time has seen the airline more than double in size from 90m passengers & a fleet of 295 aircraft to over 600 aircraft & 200m passangers!  Mark is lucky to have a fantastic team at Ryanair who are responsible for recruiting over 10,000 new employees each year covering all areas of the business!.  Mark is originally from Birmingham in the UK but Dublin is now his home."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={JamesLawless}
                  SpeakerName="James Lawless"
                  SpeakerBio="James was elected to the Dáil to represent Kildare North in 2016 and 2020 and prior to that was a
                  member of Kildare County Council, serving as Mayor of Naas in 2015. James studied Maths and Computer Science at Trinity College and Law at Kings Inns where he
                  qualified as a Barrister. He practiced with a speciality in maritime/freight law. James first got involved in politics as a commuter activist and remains a strong advocate for
                  improving transport links, rail and bus services, better walking and cycling infrastructure including
                  greenways. Within the Dáil he has become a strong voice on Technology and Digital Policy introducing ground-
                  breaking legislation on Social Media Regulation and on Cyber Harms. He served as opposition
                  spokesperson on Science & Technology from 2016-2020 and as Chair of the Justice Committee from
                  2020-2024."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={AntonioGonzalezGomez}
                  SpeakerName="Antonio Gonzalez Gomez"
                  SpeakerBio="Antonio Gonzalez Gomez is a citizen of the world. However his roots can be traced back to Galicia, in north west Spain. He currently works at the European Union Aviation Safety Agency (EASA) as a Safety Promotion Business Partner within the Communications department, leading the promotion campaign for Drones and Urban Air Mobility. Antonio has enjoyed 18 fulfilling years at EASA in Germany. Before that, he worked in banking and at British Airways, focusing on environmental issues. Passionate about aviation from a young age, he has dedicated the last three years to making aviation a more appealing career and life choice, especially for young people seeking a purpose and challenges that aviation can provide."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={AlineDecadi}
                  SpeakerName="Aline Decadi"
                  SpeakerBio="Aline Decadi is a rocket scientist from the European Space Agency. She is working on the Ariane 6 rocket, which successfully made its maiden flight on 9 July 2024. Her expertise covers the safety of those complex Ariane systems. Aline is also passionate about space exploration. She is taking part in Mars analogue missions and is actively contributing to the development of safety and transport systems in Europe. She'll be delighted to share her experiences with you, and her feedback from ESA career paths to answer your questions, and guide you in your choices."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={YvonneElsorougi}
                  SpeakerName="Yvonne Elsorougi"
                  SpeakerBio="As a Fellow of the Royal Aeronautical Society (RAeS), Yvonne is an enthusiastic champion for a
                  diverse and inclusive future generation of aviation, aerospace and space industry professionals,
                  proactively contributing to the Society's Education & Skills Committee (ESC) and Women in Aviation,
                  Aerospace & Space Committee (WAASC), as well as acting as an alta mentor.
                  Building on an extensive 35-year career in aviation and aerospace, extending across industry,
                  academia and government, Yvonne now provides independent strategic expertise to public sector
                  clients to attract inward investment, stimulate economic development and drive innovation. Excited
                  by emerging opportunities, Yvonne is a committed member of the ADS Advanced Air Mobility Group
                  and the South West of England's Sustainable Aviation Programme Board. Yvonne has also played an
                  instrumental role in the development of the West of England Space Strategy.
                  Yvonne has an MSc in Aerospace Design, Manufacture and Management from the University of
                  Bristol, an MA in European Integration from the University of Limerick and a Bachelor in Business
                  Studies from Dublin City University."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={null}
                  SpeakerName="Allison Carty"
                  SpeakerBio="Allison Carty has been a dedicated professional in the world of Air Traffic Control since 1990. Over the years, she has fulfilled various critical roles, including Air Traffic Control Officer (ATCO), Station Manager and Safety Manager. Her journey in this high-stakes field began with a passion for aviation and a commitment to ensuring the safety and efficiency of air travel.
                  As a trailblazer in a predominantly male industry, she has also been a mentor and role model for aspiring female air traffic controllers, advocating for diversity and inclusion within the field. Her dedication to continuous learning and professional development has kept her at the forefront of technological advancements and regulatory changes in aviation.
                  Her contributions have not only enhanced the safety of countless flights but have also paved the way for future generations of air traffic controllers. With over three decades of experience, she remains a vital asset to the aviation community, embodying the spirit of excellence and dedication."
                />
              </Grid>
              <Grid item xs={12} md={4} lg={4} xl={4} style={{ padding: '3%' }}>
                <Speaker 
                  SpeakerImage={LeonorGomes}
                  SpeakerName="Leonor Gomes"
                  SpeakerBio="Leonor Gomes has worked in education and outreach for over 9 years, starting at the United Nations and further developing programmes in both the private and public sectors, including charities and schools. She graduated from LSE with a MSc in Human Rights, and is currently the Education and Skills Manager at the Royal Aeronautical Society where she supports young people in their journey through the Aerospace and Aviation industry."
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </main>

    );
}
