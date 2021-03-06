import objective from './objective';
import dataset from './dataset';
import algo from './algo';
import {outModelsKeys} from './traintuples';

export default {
    objective,
    dataset,
    algo,
    model: outModelsKeys, // output model i.e trained model (updated)
    model_parents: outModelsKeys,
    model_children: outModelsKeys,
    model_family: outModelsKeys,
};
