import CodeBlock from '@theme/CodeBlock'
import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'

type DevToolProps = {
  sourceTs: string
  sourceJs: string
  component: React.FC
}

const DevTool = ({ sourceTs, sourceJs, component: Component }: DevToolProps) => {
  return (
    <Tabs groupId="devtool">
      <TabItem value="preview" label="Preview" default>
        <Component />
      </TabItem>
      <TabItem value="ts" label="Typescript">
        <CodeBlock language="tsx">{sourceTs}</CodeBlock>
      </TabItem>
      <TabItem value="js" label="Javascript">
        <CodeBlock language="jsx">{sourceJs}</CodeBlock>
      </TabItem>
    </Tabs>
  )
}

export default DevTool
