import { ActionType } from "../actions/types";

export type Action = {
  type: ActionType;
  payload?: any;
};
