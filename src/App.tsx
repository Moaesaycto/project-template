import CodeBlock, { Header, Footer, Code } from './components/main/mainComponents'
import './App.css'

const exampleCode = 
`def main():
    print("Hello, World!")
`

function App() {
  return (
    <body>
      <Header>
        Template Website
      </ Header>
      <main >
        <p>
          Hello! This is a template. You can write <Code>code</Code> (or <Code secondary={true}>secondary code</Code>) and anything else you want!
        </p>
        <CodeBlock language="python" showLineNumbers={true}>
          {exampleCode}
        </CodeBlock>
      </main>
      <Footer />
    </body>
  )
}

export default App
