import React from 'react';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const CusFooter = () => {
    return (
        <Footer style={{ backgroundColor: '#f9f9f9', padding: '40px 50px' }}>
      <Row gutter={16}>
        {/* Section 1 */}
        <Col xs={24} sm={12} md={6}>
          <h4>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#">About us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </Col>

        {/* Section 2 */}
        <Col xs={24} sm={12} md={6}>
          <h4>Products</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#">Courses</a></li>
            <li><a href="#">Programs</a></li>
            <li><a href="#">Certifications</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </Col>

        {/* Section 3 */}
        <Col xs={24} sm={12} md={6}>
          <h4>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </Col>

        {/* Section 4 */}
        <Col xs={24} sm={12} md={6}>
          <h4>Follow Us</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </Col>
      </Row>

      <div style={{ marginTop: '40px', textAlign: 'center', color: '#888' }}>
        Ennea ©2024 Created by Ennea solutions
      </div>
    </Footer>
    )
}

export default CusFooter;