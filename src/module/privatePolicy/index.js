import React from "react";
import styles from "./privatePolicy.module.scss";
export default function PrivatePolicy() {
  return (
    <div className={styles.privatePolicySection}>
      <div className="container">
        <div className={styles.privatePolicyAlignment}>
          <div className={styles.privatePolicyHeading}>
            <h1>Privacy Policy</h1>
          </div>

          <div className={styles.privatePolicyDetails}>
            <p>
              At FindMyAITool.com, the privacy of our visitors is of utmost importance to us. This Privacy Policy outlines the types of personal information we receive and collects when you use our website, as well as how we use and safeguard this
              information. By using our website, you agree to the terms of this Privacy Policy.
            </p>

            <div className={styles.privatePolicyAllDetails}>
              <h6>Information We Collect</h6>
              <p>
                We may collect personal information from you when you use our website, including your name, email address, and any other information you provide to us. We may also collect non-personal information, such as your IP address, browser
                type, and operating system.
              </p>
            </div>

            <div className={styles.privatePolicyAllDetails}>
              <h6>How We Use Your Information</h6>
              <p>We use the information we collect to provide you with the best possible service and to improve our website. Specifically, we may use your personal information to:</p>
              <ul>
                <li>Respond to your inquiries and requests</li>
                <li>Provide you with updates and information about our services</li>
                <li>Improve the content and functionality of our website</li>
                <li>We may also use your non-personal information to analyze trends and usage patterns on our website.</li>
              </ul>
            </div>

            <div className={styles.privatePolicyAllDetails}>
              <h6>Sharing Your Information</h6>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent. However, we may share your information with trusted third parties who assist us in operating our website, conducting our
                business, or providing services to you. These third parties are required to keep your information confidential and are not allowed to use it for any other purpose.
              </p>
              <p>We may also release your information when we believe it is appropriate to comply with the law, enforce our website policies, or protect our rights or the rights of others.</p>
            </div>
            <div className={styles.privatePolicyAllDetails}>
              <h6>Data Security</h6>
              <p>
                We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use secure servers and encryption to ensure the confidentiality and integrity of your information.
              </p>
            </div>
            <div className={styles.privatePolicyAllDetails}>
              <h6>Cookies</h6>
              <p>
                We use cookies to enhance your experience on our website. A cookie is a small file that is placed on your device when you visit our website. It allows us to remember your preferences and personalize your experience. You can disable
                cookies in your browser settings, but this may affect your ability to use some features of our website.
              </p>
            </div>
            <div className={styles.privatePolicyAllDetails}>
              <h6>Third-Party Links</h6>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of these websites before providing any personal
                information.
              </p>
            </div>
            <div className={styles.privatePolicyAllDetails}>
              <h6>Updates to Our Privacy Policy</h6>
              <p>We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page, and the date at the top of the page will be updated.</p>
            </div>
            <div className={styles.privatePolicyAllDetails}>
              <h6>Contact Us</h6>
              <p>If you have any questions or concerns about our Privacy Policy, please contact us at info@findmyaitool.com.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
