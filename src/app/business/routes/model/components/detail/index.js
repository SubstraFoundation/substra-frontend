import React from 'react';
import PropTypes from 'prop-types';
import {noop} from 'lodash';
import Detail from '../../../../common/components/detail';
import {withDetailRedux} from './redux';
import {withDetailAnalytics} from '../../../../common/components/detail/analytics';
import Title from './components/title';
import Metadata from './components/metadata';
import Actions from './components/actions';
import {
Tab, TabList, TabPanel, Tabs,
} from '../../../../common/components/detail/components/tabs';
import CodeSample from '../../../../common/components/detail/components/codeSample';
import CopyInput from '../../../../common/components/detail/components/copyInput';
import {
    AlertWrapper, AlertTitle, AlertActions, AlertInlineButton,
} from '../../../../common/components/alert';


class ModelDetail extends Detail {
    filterUp = o => (e) => {
        e.preventDefault();
        e.stopPropagation();

        const {item, filterUp, logFilterFromDetail} = this.props;
        filterUp(item.traintuple.outModel.hash);
        logFilterFromDetail(item.traintuple.outModel.hash);
    };
}

class ModelDetailWithLocalComponents extends React.Component {
    state = {
        selectedTab: 0,
    };

    setSelectedTab = (index) => {
        this.setState({
            selectedTab: index,
        });
    };

    gotoTesttuple = () => {
        this.setSelectedTab(1);
    };

    render() {
        const {item, addNotification, ...rest} = this.props;
        return (
            <ModelDetail
                Title={Title}
                Actions={Actions}
                Metadata={Metadata}
                item={item}
                addNotification={addNotification}
                {...rest}
            >
                {item && item.traintuple && item.traintuple.status === 'done' && !item.testtuple && (
                    <AlertWrapper>
                        <AlertTitle>This model has not been tested yet</AlertTitle>
                        <AlertActions>
                            <AlertInlineButton onClick={this.gotoTesttuple}>learn more</AlertInlineButton>
                        </AlertActions>
                    </AlertWrapper>
                )}
                <Tabs
                    selectedIndex={this.state.selectedTab}
                    onSelect={this.setSelectedTab}
                >
                    <TabList>
                        <Tab>Traintuple/Model</Tab>
                        <Tab>Certified testtuple</Tab>
                        {/* todo: add other testtuples tab */}
                    </TabList>
                    <TabPanel>
                        <CodeSample
                            filename="traintuple.json"
                            language="json"
                            codeString={JSON.stringify(item.traintuple, null, 2)}
                        />
                    </TabPanel>
                    <TabPanel>
                        {item.testtuple && (
                            <React.Fragment>
                                <CodeSample
                                    filename="testtuple.json"
                                    language="json"
                                    codeString={JSON.stringify(item.testtuple, null, 2)}
                                />
                            </React.Fragment>
                        )}
                        {item.traintuple && !item.testtuple && (
                            (item.traintuple.status === 'done' && (
                                <React.Fragment>
                                    <p>
                                        {'In order to test this model, execute the following command:'}
                                    </p>
                                    <CopyInput
                                        value={`substra add testtuple '{"traintuple_key": "${item.traintuple.key}"}'`}
                                        isPrompt
                                    />
                                </React.Fragment>

                            ))
                            || (item.traintuple.status === 'failed' && (
                                <p>This model could not complete its training (no testing possible).</p>
                            ))
                            || (['todo', 'doing'].includes(item.traintuple.status) && (
                                <React.Fragment>
                                    <p>You can execute the code below to launch a testing task as soon as the training is over.</p>
                                    <CopyInput
                                        value={`substra add testtuple '{"traintuple_key": "${item.traintuple.key}"}'`}
                                        isPrompt
                                    />
                                </React.Fragment>
                            ))
                        )}
                    </TabPanel>
                </Tabs>
            </ModelDetail>
        );
    }
}

ModelDetailWithLocalComponents.propTypes = {
    item: PropTypes.shape(),
    addNotification: PropTypes.func,
};

ModelDetailWithLocalComponents.defaultProps = {
    item: null,
    addNotification: noop,
};

export default withDetailRedux(withDetailAnalytics(ModelDetailWithLocalComponents));
