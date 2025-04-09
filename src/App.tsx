import CodeBlock, { Header, Footer, Code, BasicList } from './components/main/mainComponents'
import './App.css'
import { Heading, TableOfContents } from './components/contexts/TOCContext'
import Collapsible from './components/main/Collapsible'

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
        <Heading>
          Hello
        </Heading>
        <p>
          This is a simple page to show the template that I use to make my webapps. It isn't anything special, but it's got
          everything I'll need to make my work. If you are interested in the source code, you can find it <a href="https://github.com/Moaesaycto/project-template">here</a>!
        </p>
        <TableOfContents />
        <Heading level={2}>
          Coding Example (Secondary Heading Example)
        </Heading>
        <p>
          You can write <Code>code</Code> (or <Code secondary={true}>secondary code</Code>). You could use code blocks, too. You'll need to
          add the language you wish to use in the configuration file <Code>template.config.ts</Code>. There should be some examples inside already.
        </p>
        <CodeBlock language="python" showLineNumbers={true}>
          {exampleCode}
        </CodeBlock>
        <p>
          You can also copy the code in the top corner of the code block. It's a very basic implementation, but it's best to keep things minimal.
        </p>
        <Heading level={3}>
          Headings Go Deep
        </Heading>
        <p>
          The nesting of headings automatically updates it in the table of contents, which is very useful since you no longer have to manually add them in. Just remember to hard-refresh
          the page while developing the website, because sometimes it gets confused.
        </p>
        <Heading level={3}>
          Some More Filler
        </Heading>
        <p>
          Don't you enjoy pasta? Well, I do. Let me tell you, there's like hundreds of different kinds of shapes that you can make. Of all of the permutations, surely many of them
          are just the exact same but under different names. Does spaghetti count as pasta? I really don't know. I'm just trying to fill this place with text, man.
        </p>
        <Heading level={2}>
          Collapsible Containers
        </Heading>
        <p>
          You can make a container that collapses smoothly. To understand how it works, consider checking out my example on <a href="https://moaesaycto.github.io/workflows/#/computing/react/Collapsible-with-Dynamic-Smooth-Height-Transition">Workflows</a>.
        </p>
        <Collapsible label="More Info" variant="zinc">
          <div className="p-4">
            <p>This is a smoothly expanding container!</p>
            <p>You can put anything in here.</p>
            <p>You have no idea how long this took to get working...</p>
            <p>Final line</p>
          </div>
        </Collapsible>
        <p>
          If you look closely, you'll see the corners of the containers working nicely. There are also many colour variants for these containers if you want something a little more vibrant.
        </p>
        <Heading level={2}>
          Other things I've Forgotten to Mention
        </Heading>
        <p>
          Here's an example of a <a href="https://google.com">link</a>. Lists also work and exist, although they need to use the custom component to render properly.
        </p>
        <BasicList ordered={false}>
          <li>Item one</li>
          <li>Item two</li>
          <li>Item three</li>
        </BasicList>

      </main>
      <Footer />
    </div>
  )
}

export default App
