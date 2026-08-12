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

sx={{
    minHeight: 44,
    padding: "0.75rem 1.5rem",
    border: "1px solid var(--avcon-accent)",
    borderRadius: "8px",
    backgroundColor: "var(--avcon-accent)",
    color: "var(--avcon-white)",
    fontWeight: 700,
    lineHeight: 1.2,
    textTransform: "none",
    transition: "background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
    "&:hover": {
        backgroundColor: "var(--avcon-accent-light)",
        borderColor: "var(--avcon-accent-light)",
        transform: "translateY(-2px)",
    },
    "&:focus-visible": {
        outline: "3px solid var(--avcon-focus)",
        outlineOffset: "3px",
    },
}}

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
