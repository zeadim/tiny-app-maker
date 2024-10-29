import { Component } from "./components/component";
import { $Button } from "./components/button";
import { $TextInput } from "./components/text-input";
import { $NumberInput } from "./components/number-input";
import { $Label } from "./components/label";
import { $Cell } from "./components/cell";

// Maps name of component as used in configuration to its class implementation
export const componentMap = new Map<string, typeof Component>([
    ["button", $Button],
    ["text-input", $TextInput],
    ["number-input", $NumberInput],
    ["label", $Label],
    ["cell", $Cell],
]);
