import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      width: "100vw",
      backgroundColor: "#2A2A2A",
      padding: "50px 0",
      marginTop: "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        padding: "0 0px",
        textAlign: "center",
        color: "white",
        marginBottom: "10px"
      }}>
        <a 
          href="https://github.com/iamjannisgrimm/my-portfolio" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "white",
            textDecoration: "none",
            marginBottom: "15px",
            display: "block",
            opacity: 0.8,
            transition: "opacity 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.opacity = "1"}
          onMouseOut={(e) => e.target.style.opacity = "0.8"}
        >
          View Source on GitHub
        </a>
        <a 
          href="mailto:iamjannisgrimm@gmail.com" 
          style={{
            color: "white",
            textDecoration: "none",
            marginBottom: "15px",
            display: "block",
            opacity: 0.8,
            transition: "opacity 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.opacity = "1"}
          onMouseOut={(e) => e.target.style.opacity = "0.8"}
        >
          iamjannisgrimm@gmail.com
        </a>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Jannis Grimm. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;