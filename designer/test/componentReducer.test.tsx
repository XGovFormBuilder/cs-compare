import sinon from "sinon";
import React from "react";
import { shallow, mount } from "enzyme";
import * as Code from "@hapi/code";
import * as Lab from "@hapi/lab";
import * as Component from "../client/reducers/component/componentReducer";
import { TextFieldEdit } from "../client/component-editors/text-field-edit";
import { MultilineTextFieldEdit } from "../client/multiline-text-field-edit";
import FieldEdit from "../client/field-edit";
import { Textarea } from "@govuk-jsx/textarea";
const { expect } = Code;
const lab = Lab.script();
exports.lab = lab;
const { describe, test, beforeEach, suite, experiment } = lab;
z;