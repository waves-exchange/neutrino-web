import React from 'react';
import { connect } from 'react-redux';
import { Translation } from 'react-i18next';
import { getUser } from 'yii-steroids/reducers/auth';
import { html } from 'components';
import { Closed } from './img/Closed';
import { FormTabEnum } from './enums';
import { Props, State } from './types';
import Button from 'yii-steroids/ui/form/Button';

import './BondsDashboard.scss';

const bem = html.bem('BondsDashboard');

const DEFAULT_ROI_DISCOUNT = 10;

const ROI_LS_KEY = 'roi_discount';
const BR_LS_KEY = 'backing_ratio';
const DEFICIT_LS_KEY = 'deficit_percent';

class BondsDashboard extends React.Component<Props, State> {
    _isUpdating: boolean;

    constructor(props) {
        super(props);
        this._isUpdating = false;

        this.state = {
            currentRoi: Number(localStorage.getItem(ROI_LS_KEY)) || DEFAULT_ROI_DISCOUNT,
            formTab: FormTabEnum.AUCTION,
            backingRatio: Number(localStorage.getItem(BR_LS_KEY)) || 0,
            neutrinoSupply: 0,
            currentDeficitPercent: Number(localStorage.getItem(DEFICIT_LS_KEY)) || 0,
            neutrinoReserves: 0,
        };
    }

    render() {
        return (
            <Translation>
                {(t) => {

                    return (
                        <div className={bem.block()}>
                            <div className={'BondsDashboard_info'}>
                                <div>
                                    <Closed className={'BondsDashboard_closed'}/>
                                    <div className={'BondsDashboard_title'}>
                                        Мы переехали
                                    </div>
                                    <div className={'BondsDashboard_content'}>
                                    </div>
                                </div>
                                <Button className={'BondsDashboard_button'}
                                        type={'button'}
                                        onClick={this.goToWavesExchange}
                                >
                                    Go to Waves.Exchange
                                </Button>
                            </div>
                        </div>
                    );
                }}
            </Translation>
        );
    }

    goToWavesExchange() {
        window.location.href = 'https://waves.exchange/investments';
    }
}

export default connect((state) => ({
    user: getUser(state),
}))(BondsDashboard);
