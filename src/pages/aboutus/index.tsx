import React from 'react'
import { Box, Container, Divider, List, ListItem, ListItemText, Tab, Typography } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Header } from '../../components/header'
import { Footer } from '../../components/footer'

export const AboutUs = () => {
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 10, pb: 16 }}>
        <Typography variant="h3" gutterBottom sx={{ mt: 4 }}>
          About Us
        </Typography>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="About Us" indicatorColor="secondary">
                <Tab label="Mission" value="1" />
                <Tab label="Goals" value="2" />
                <Tab label="Roadmap" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Typography variant="body1" gutterBottom>
                The mission statement for our project "Fair Journal" is to create a decentralized platform that empowers
                authors and readers with complete ownership and control over their content and data. We believe that the
                current centralized blogging platforms have several disadvantages that limit the creativity and freedom
                of expression of both authors and readers.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Centralized blogs are controlled by a central authority that decides what content can be published and
                who can access it. This leads to issues such as censorship, where certain ideas and opinions may be
                silenced or removed from the platform. It also limits the ability of authors to monetize their content,
                as the platform owner often takes a large percentage of the revenue generated from the content.
              </Typography>
              <Typography variant="body1" gutterBottom>
                In contrast, our platform is decentralized and powered by blockchain technology. This means that there
                is no central authority controlling the platform, and users have complete control over their content and
                data. This leads to several advantages for both authors and readers:
              </Typography>
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primaryTypographyProps={{ variant: 'h6' }}
                    primary="Freedom of expression"
                    secondary="With Fair Journal, authors can freely express their ideas and opinions without fear of being silenced or removed from the platform. This allows for a more diverse range of perspectives and ideas to be shared on the platform."
                  />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primaryTypographyProps={{ variant: 'h6' }}
                    primary="Ownership and control of content"
                    secondary="Fair Journal is designed to give users complete ownership and control over their content. This means that authors can decide how their content is published, shared, and distributed, and they can choose whether or not to monetize their content."
                  />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primaryTypographyProps={{ variant: 'h6' }}
                    primary="Fair compensation for creators"
                    secondary="Through features such as donations and NFT purchases, users can support the creators they love and help them earn a living from their work. This provides authors with a fair and transparent way to monetize their content without relying on a centralized platform owner."
                  />
                </ListItem>
                <Divider />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primaryTypographyProps={{ variant: 'h6' }}
                    primary="Privacy and security"
                    secondary="With Fair Journal, users have complete control over their data and can decide how it is used and who has access to it. This provides users with greater privacy and security compared to centralized blogging platforms, which may be vulnerable to data breaches and hacking attempts."
                  />
                </ListItem>
              </List>
              <Typography variant="body1" gutterBottom>
                Overall, our mission with Fair Journal is to create a platform that puts the power back in the hands of
                the users. We believe that by providing a decentralized and community-driven platform, we can create a
                more fair and equitable system for both authors and readers.
              </Typography>
            </TabPanel>
            <TabPanel value="2">
              <Typography variant="h6">Short-term goals:</Typography>
              <List>
                <ListItem>Launch the Fair Journal platform on the TON blockchain</ListItem>
                <ListItem>Acquire 1,000 active users within the first six months</ListItem>
                <ListItem>Establish partnerships with leading blockchain and publishing organizations</ListItem>
              </List>

              <Typography variant="h6">Long-term goals:</Typography>
              <List>
                <ListItem>Become a leading platform for decentralized blogging and content creation</ListItem>
                <ListItem>Expand into new markets and languages, with a focus on emerging economies</ListItem>
                <ListItem>
                  Build a strong and vibrant community of users who support each other and promote free expression
                </ListItem>
              </List>

              <Typography variant="h6">Metrics for success:</Typography>
              <List>
                <ListItem>Acquire 1,000 active users within the first six months</ListItem>
                <ListItem>Publish 10,000 articles on the platform within the first year</ListItem>
                <ListItem>Sell 1,000 NFTs within the first year</ListItem>
              </List>

              <Typography variant="h6">Impact:</Typography>
              <List>
                <ListItem>
                  Empower independent journalists and content creators to share their ideas and opinions without fear of
                  censorship or reprisal
                </ListItem>
                <ListItem>Promote free expression and open dialogue on a global scale</ListItem>
                <ListItem>
                  Advance the adoption of decentralized technologies and the principles of decentralization more broadly
                </ListItem>
              </List>
            </TabPanel>
            <TabPanel value="3">
              <Typography variant="h6">Milestone 1:</Typography>
              <List>
                <ListItem>
                  The first milestone involves the implementation of the main page of the platform, which will describe
                  the project and its features. Additionally, an editor will be added to the platform to enable authors
                  to create articles. The platform will also implement authorization via TON wallet and signing articles
                  using it to confirm authorship. Finally, the milestone will include the implementation of blog
                  creation and management.
                </ListItem>
              </List>

              <Typography variant="h6">Milestone 2:</Typography>
              <List>
                <ListItem>
                  The second milestone is focused on implementing wallet subscriptions. This will allow readers to
                  subscribe to their favorite authors with the possibility of adding their Telegram for mailing.
                  Additionally, readers will be able to collect NFTs articles and donate to authors.
                </ListItem>
              </List>

              <Typography variant="h6">Milestone 3:</Typography>
              <List>
                <ListItem>
                  The final milestone involves implementing content uploading and articles creation in TON Storage. This
                  will enable the platform to provide users with a more secure and reliable way to store their data.
                </ListItem>
              </List>

              <Typography variant="body1">
                Each milestone represents a significant step in the development of the platform, and once they are
                achieved, they will bring Fair Journal closer to its ultimate goal of providing a decentralized and
                censorship-resistant platform for authors and readers. The roadmap demonstrates the team's commitment to
                achieving their objectives and their dedication to providing users with a high-quality and user-friendly
                platform.
              </Typography>
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <Footer />
    </>
  )
}
