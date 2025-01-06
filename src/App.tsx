import CodeBlock, { Header, Footer, Code } from './components/main/mainComponents'
import './App.css'
import { Heading } from './components/contexts/TOCContext'

const exampleCode =
  `def main():
    print("Hello, World!")
`

function App() {
  return (
    <div className="body">
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
        <Heading>
          Hello
        </Heading>
        <Heading level={2}>
          This is a secondary heading!
        </Heading>
        <p>
          Don't you enjoy pasta? Well, I do. Let me tell you, there's like hundreds of different kinds of shapes that you can make. Of all of the permutations, surely many of them
          are just the exact same but under different names. Does spaghetti count as pasta? I really don't know. I'm just trying to fill this place with text, man.
        </p>
        <Heading level={2}>
          This is a secondary heading!
        </Heading>
        <p>
          Don't you enjoy pasta? Well, I do. Let me tell you, there's like hundreds of different kinds of shapes that you can make. Of all of the permutations, surely many of them
          are just the exact same but under different names. Does spaghetti count as pasta? I really don't know. I'm just trying to fill this place with text, man. Did you think this
          paragraph would be identical? Well, you're right.
        </p>
        <p>
          Here's an example of a <a>link</a>
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default App
