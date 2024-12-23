const style = {
  width: '100%',
  height: '500px',
  border: 0,
  borderRadius: '4px',
  overflow: 'hidden',
}

export const CodeSandbox = ({ sandboxId }: { sandboxId: string }) => {
  return (
    <iframe
      src={`https://codesandbox.io/embed/${sandboxId}?view=preview&module=%2Fsrc%2FApp.jsx`}
      style={style}
      title="codesandbox-react-jsx"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
