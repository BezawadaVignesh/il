import React from "react";
import { Tabs, Card } from "antd";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/NarBar/NavBar";
import TabPane from "antd/es/tabs/TabPane";
import styled from "styled-components";

const { Meta } = Card;

const HomeContainer = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.background};
`;

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.background};
  padding-block: 30px;
  width: max(80%, 250px);
  margin: auto;
`;

const Heading = styled.div`
  font-family: var(--font-stack-heading-serif);
  font-weight: 700;
  font-size: 2.2rem;
  letter-spacing: -0.016rem;
  max-width: 36em;
  color: ${({ theme }) => theme.text};
`;

const SubHeading = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.2rem;
  font-weight: 600;
  max-width: 96rem;
`;

const TabSection = styled.div`
  background-color: ${({ theme }) => theme.background};
  width: max(80%, 250px);
  margin: auto;
  color: red;
`;

const CourseDisplay = styled.div`
  display: flex;
  overflow: auto;
  column-gap: 18px;
  padding-block: 20px;
`;

const CourseCard = styled(Card)`
  width: max(30%, 240px);
  background-color: ${({ theme }) => theme.cardBackground};
`;

const TrustedSection = styled.div`
  padding-block: 70px;
  margin-block: 100px;
  display: grid;
  place-items: center;
  row-gap: 22px;
  background-color: ${({ theme }) => theme.background};
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background-color: ${({ theme }) => theme.background};
  }

  .ant-tabs-nav .ant-tabs-tab {
    color: ${({ theme }) => theme.text};
  }

  .ant-tabs-nav .ant-tabs-tab-active {
    // color: blue;
    // font-weight: bold;
  }

  .ant-tabs-ink-bar {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const TrustedSubHeading = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.2rem;
  font-weight: 600;
  max-width: 96rem;
`;

const TrustedLogos = styled.div`
  display: flex;
  column-gap: 70px;
`;

export const Home = () => {
  return (
    <HomeContainer>
      <Navbar />
      <ContentWrapper>
        <Heading>All the skills you need in one place</Heading>
        <SubHeading>
          From critical skills to technical topics, Udemy supports your
          professional development.
        </SubHeading>
      </ContentWrapper>

      <TabSection>
        <StyledTabs defaultActiveKey="1">
          <TabPane tab={"Web Development"} key="Web Development">
            <CourseDisplay className="course-display">
              {Array.from({ length: 10 }, (_, i) => (
                <CourseCard
                  key={i}
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://img-c.udemycdn.com/course/240x135/1565838_e54e_18.jpg"
                    />
                  }
                >
                  <Meta
                    title="The Complete 2024 Web Development Bootcamp"
                    description="Dr. Angela Yu, Developer and Lead Instructor"
                  />
                </CourseCard>
              ))}
            </CourseDisplay>
          </TabPane>

          <TabPane tab={"IT Certifications"} key="IT Certifications">
            <div style={{ minHeight: "300px" }}>IT Certifications</div>
          </TabPane>

          <TabPane tab={"Leadership"} key="Leadership">
            <div style={{ minHeight: "300px" }}>Leadership</div>
          </TabPane>

          <TabPane tab={"Data Science"} key="Data Science">
            <div style={{ minHeight: "300px" }}>Data Science</div>
          </TabPane>

          <TabPane tab={"Communication"} key="Communication">
            <div style={{ minHeight: "300px" }}>Communication</div>
          </TabPane>
        </StyledTabs>
      </TabSection>

      <TrustedSection>
        <TrustedSubHeading>
          We like to be trusted by over 16,000 companies and millions of learners around the world
        </TrustedSubHeading>
        <TrustedLogos>
          <img src="https://cms-images.udemycdn.com/content/tqevknj7om/svg/volkswagen_logo.svg?position=c&quality=80&x.app=portals" />
          <img src="https://cms-images.udemycdn.com/content/2gevcc0kxt/svg/samsung_logo.svg?position=c&quality=80&x.app=portals" />
          <img src="https://cms-images.udemycdn.com/content/mueb2ve09x/svg/cisco_logo.svg?position=c&quality=80&x.app=portals" />
          <img src="https://cms-images.udemycdn.com/content/ryaowrcjb2/svg/vimeo_logo_resized-2.svg?position=c&quality=80&x.app=portals" />
          <img src="https://cms-images.udemycdn.com/content/bthyo156te/svg/procter_gamble_logo.svg?position=c&quality=80&x.app=portals" />
          <img src="https://cms-images.udemycdn.com/content/luqe0d6mx2/svg/hewlett_packard_enterprise_logo.svg?position=c&quality=80&x.app=portals" />
          <img src="https://cms-images.udemycdn.com/content/siaewwmkch/svg/citi_logo.svg?position=c&quality=80&x.app=portals" />
        </TrustedLogos>
      </TrustedSection>

      <Footer />
    </HomeContainer>
  );
};
