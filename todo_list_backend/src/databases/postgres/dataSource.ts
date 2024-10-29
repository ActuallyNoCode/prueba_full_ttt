import { config } from 'src/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSource = new DataSource(config.database as DataSourceOptions);
export default dataSource;
