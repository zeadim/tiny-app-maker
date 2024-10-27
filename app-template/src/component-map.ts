import { Component } from "./component";
import { $Button } from "./components/button";
import { $TextInput } from "./components/text-input";

// Maps name of component as used in configuration to its class implementation
export const componentMap = new Map<string, typeof Component>([
    ["button", $Button],
    ["text-input", $TextInput],
]);
