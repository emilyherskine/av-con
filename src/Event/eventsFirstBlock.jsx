import React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function EventFirstBlock() {
  return (
    <Box sx={{ padding: { xs: '0 2%', md: '0 5%' }, textAlign: 'center' }}>
      <Box sx={{ textAlign: 'center', padding: '1%' }}>
        <p>
        Welcome to AvCon 2026 - an exhilarating journey into the future of aviation! Calling all Primary, Secondary, and 3rd Level Students, as well as aviation enthusiasts, to join us for a thrilling adventure that will take you soaring through the skies of innovation and discovery.
        <br/><br/>
        </p>
        <hr/>
        <br/>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="https://fullfatthings-keyaero.b-cdn.net/sites/keyaero/files/inline-images/Pilatus%20PC-9M%20%5B260%2C%20Irish%20Air%20Corps%20College%20-%20Flying%20Training%20School%2C%20Irish%20Air%20Corps%2C%20RAF%20Cosford%20Airshow%202016%5D%201.JPG"
              alt="Airplane"
              style={{ width: '100%', maxWidth: '100%', mixBlendMode: 'luminosity' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <p>
            Explore the Wonders of Aviation: AvCon is not just an event; it's a portal to the cutting edge of aviation technology and exploration. From the basics of flight to the latest advancements in aerospace engineering, there's something for everyone.
            <br/><br/>
            Hands-On Learning: Primary students will be captivated by interactive exhibits, showcasing the fundamental principles of flight in a fun and engaging way. Secondary students will delve deeper into the mechanics of aircraft design and aerodynamics, gaining insights that will fuel their curiosity for the skies.
            <br/><br/>
            Career Pathways: For tertiary students and young aviation enthusiasts, AvCon 2026 provides a unique opportunity to connect with industry professionals, explore career options, and gain valuable insights into the diverse and exciting world of aviation careers.
            <br/><br/>
            Inspirational Speakers: AvCon 2026 brings together visionaries, pioneers, and experts from the aviation industry. Get ready to be inspired by captivating talks and discussions on the future of air travel, space exploration, and sustainable aviation.
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
