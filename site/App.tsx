import VanillaReactHookFormSample from "./samples/vanilla/react-hook-form";
import VanillaReactHookFormWithDefaultValueSample from "./samples/vanilla/react-hook-form-default-value";
import VanillaReactHookFormWithOriginalRenderSample from "./samples/vanilla/react-hook-form-with-original-render";
import MaterialUIReactHookFormSample from "./samples/material/react-hook-form";
import ChakraUIReactHookFormSample from "./samples/chakra-ui/react-hook-form";

function App() {
  return (
    <div>
      <VanillaReactHookFormSample />
      <VanillaReactHookFormWithDefaultValueSample />
      <VanillaReactHookFormWithOriginalRenderSample />
      <MaterialUIReactHookFormSample />
      <ChakraUIReactHookFormSample />
    </div>
  );
}

export default App;
