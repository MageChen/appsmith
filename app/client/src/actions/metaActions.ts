import {
  ReduxActionTypes,
  ReduxAction,
} from "@appsmith/constants/ReduxActionConstants";
import { BatchAction, batchAction } from "actions/batchActions";
import { EvalMetaUpdates } from "workers/DataTreeEvaluator/types";

export interface UpdateWidgetMetaPropertyPayload {
  widgetId: string;
  propertyName: string;
  propertyValue: any;
}

export function updateWidgetMetaProperty(
  widgetId: string,
  propertyName: string,
  propertyValue: any,
): BatchAction<UpdateWidgetMetaPropertyPayload> {
  return batchAction({
    type: ReduxActionTypes.SET_META_PROP_AND_EVAL,
    payload: {
      widgetId,
      propertyName,
      propertyValue,
    },
  });
}

export function resetWidgetMetaProperty(
  widgetId: string,
): BatchAction<{ widgetId: string }> {
  return batchAction({
    type: ReduxActionTypes.RESET_WIDGET_META,
    payload: {
      widgetId,
    },
    postEvalActions: [{ type: ReduxActionTypes.RESET_WIDGET_META_EVALUATED }],
  });
}

export function resetChildrenMetaProperty(
  widgetId: string,
): ReduxAction<{ widgetId: string }> {
  return {
    type: ReduxActionTypes.RESET_CHILDREN_WIDGET_META,
    payload: {
      widgetId,
    },
  };
}

export const updateMetaState = (evalMetaUpdates: EvalMetaUpdates) => {
  return {
    type: ReduxActionTypes.UPDATE_META_STATE,
    payload: {
      evalMetaUpdates,
    },
  };
};

export function triggerEvalOnMetaUpdate() {
  return batchAction({
    type: ReduxActionTypes.META_UPDATE_DEBOUNCED_EVAL,
    payload: {},
  });
}

export function syncUpdateWidgetMetaProperty(
  widgetId: string,
  propertyName: string,
  propertyValue: any,
) {
  return {
    type: ReduxActionTypes.SET_META_PROP,
    payload: {
      widgetId,
      propertyName,
      propertyValue,
    },
  };
}
