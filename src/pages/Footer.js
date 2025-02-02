import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer class="bg-azulOscuro">
            <p>Copyright 2022©</p>
            <div className="social-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/016/716/447/small_2x/facebook-icon-free-png.png" alt="Facebook" />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/027/395/710/small/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png" alt="Twitter" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://static.vecteezy.com/system/resources/previews/018/930/691/original/instagram-logo-instagram-icon-transparent-free-png.png" alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://i.pinimg.com/originals/0c/78/d0/0c78d03cbfa19d5f3d7ad1b6e49f957b.png" alt="LinkedIn" />
                </a>
            </div>
        </footer>
    );
}
export default Footer;
