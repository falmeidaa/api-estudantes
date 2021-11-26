import './styles.scss'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import React from 'react'

const Header: React.FC = () => {
  return (
    <Container data-testid="headerWrap" className="headerWrap" fluid>
      <Row>
        <img data-testid="logo" src="https://www.waproject.com.br/assets/image/logo.svg"/>
      </Row>
    </Container>
  )
}

export default Header
