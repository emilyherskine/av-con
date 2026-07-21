import React, {useState} from "react";

import {
    Box,
    Button,
    Typography,
    Collapse,
    Divider
} from "@mui/material";

import "./newsArticle.css";


export default function NewsArticle({

    title,
    summary=[],
    fullContent=[],
    tags="",
    galleryLink="",
    email=""

}) {


const [expanded,setExpanded] = useState(false);



return (

<Box className="news-article-container">


<Typography 
    variant="h4"
    className="news-article-title"
>
    {title}
</Typography>



<Divider />



<div className="article-summary">

{

summary.map((para,index)=>(

<Typography
    key={index}
    className="news-article-paragraph"
>
{para}

</Typography>

))

}

</div>




<Collapse in={expanded}>


<Divider sx={{my:3}} />


{

fullContent.map((para,index)=>(

<Typography

key={index}

className="news-article-paragraph"

>

{para}

</Typography>

))

}



{

galleryLink &&

<Typography className="news-article-paragraph">

📸 View the photo gallery{" "}

<a href={galleryLink} target="_blank" rel="noopener noreferrer">

here

</a>

</Typography>

}




{

email &&

<Typography className="news-article-paragraph">

✉️ Want to get involved? Contact{" "}

<a href={`mailto:${email}`}>

{email}

</a>

</Typography>

}



{

tags &&

<Typography className="news-article-tags">

{tags}

</Typography>

}



</Collapse>




<Box className="news-article-button-container">

<Button

onClick={()=>setExpanded(!expanded)}

variant="contained"

>

{

expanded

? "Show Less ▲"

: "Read More ▼"

}


</Button>


</Box>



</Box>


);

}