import styled from 'styled-components'

const Wrapper = styled.section`
  .info-row {
    display: flex;

    margin: 6px 0 6px 0;
  }
  strong {
    margin-right: 10px; /* Adjust spacing between strong and span elements */
    flex: 1; /* Allow the span to take up the remaining space */
  }
  span {
    /* Add any styles you want for the span elements */
    flex: 2; /* Adjust this value to control the space between strong and span */
  }
`

export default Wrapper;