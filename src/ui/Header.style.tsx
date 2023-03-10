import styled from 'styled-components'

const Header = styled.header`
  width: 100%;
  padding: 32px 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 10;
  backdrop-filter: blur(10px);
`

const Group = styled.div`
  gap: 20px;
  display: flex;
`

export { Header, Group }
