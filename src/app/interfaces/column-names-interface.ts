/**
 * Used for getting input from user regarding types of data and
 * will be passed b/w different visualizations for initializing 
 * 'attributes-list'
 */
export interface ColumnNames {
    column_name: string,
    isValid ?: boolean;
    type ?: any; //nominal,ordinal,interval, ratio
}