import React, { Component, PropTypes } from "react";

import FilterList from "./filters/FilterList.jsx";
import AggregationWidget from "./AggregationWidget.jsx";
import FieldSet from "metabase/components/FieldSet.jsx";

import Query from "metabase/lib/query";


export default class QueryDefinitionTooltip extends Component {

    static propTypes = {
        type: PropTypes.string,
        object: PropTypes.object.isRequired,
        tableMetadata: PropTypes.object.isRequired
    };

    render() {
        const { type, object, tableMetadata } = this.props;

        return (
            <div className="p2" style={{width: 250}}>
                <div>
                    { type && type === "metric" && !object.is_active ?
                        "This metric has been retired.  It's no longer available for use."
                    :
                        object.description
                    }
                </div>
                { object.definition &&
                    <div className="mt2">
                        <FieldSet legend="Definition" className="border-light">
                            <div className="TooltipFilterList">
                                { Query.getAggregations(object.definition).map(aggregation =>
                                    <AggregationWidget
                                        aggregation={aggregation}
                                        tableMetadata={tableMetadata}
                                    />
                                )}
                                <FilterList
                                    filters={Query.getFilters(object.definition)}
                                    tableMetadata={tableMetadata}
                                    maxDisplayValues={Infinity}
                                />
                            </div>
                        </FieldSet>
                    </div>
                }
            </div>
        );
    }
}
