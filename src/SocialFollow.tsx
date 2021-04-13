import React from "react";
import {
    faYoutube, faTwitter, faInstagram, faTwitch, faGithub
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SocialFollow() {
    return (
        <div className="social-container">
            <h4 className="social-header">Created by cmac__17</h4>
            <a href="https://www.youtube.com/channel/UC0-Oeh_PB_BXsip3pCsIm8g"
               className="youtube social">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://www.twitch.tv/cmac__17"
               className="twitch social">
                <FontAwesomeIcon icon={faTwitch} size="2x" />
            </a>
            <a href="https://twitter.com/cmac__17" className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com/cmac__17/"
               className="instagram social">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://github.com/cmac17"
               className="github social">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
        </div>
    );
}