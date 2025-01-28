import Login from "./Login.tsx";
import {Col,Row} from "antd";

function App() {


  return (

      <Row justify="center" align="middle" style={{
        minHeight: "100vh",
      }}>
        <Col >
          <Login/>
        </Col>
      </Row>
  )
}

export default App
