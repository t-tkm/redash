import { useCallback } from "react";
import { extend, filter, find } from "lodash";

import useImmutableCallback from "@/lib/hooks/useImmutableCallback";
import EditVisualizationDialog from "@/components/visualizations/EditVisualizationDialog";

export default function useEditVisualizationDialog(query, queryResult, onChange) {
  const handleChange = useImmutableCallback(onChange);

  return useCallback(
    (visualizationId = null) => {
      const visualization = find(query.visualizations, { id: visualizationId }) || null;
      EditVisualizationDialog.showModal({
        query,
        visualization,
        queryResult,
      }).onClose(updatedVisualization => {
        const filteredVisualizations = filter(query.visualizations, v => v.id !== updatedVisualization.id);
        handleChange(
          extend(query.clone(), { visualizations: [...filteredVisualizations, updatedVisualization] }),
          updatedVisualization
        );
      });
    },
    [query, queryResult, handleChange]
  );
}
