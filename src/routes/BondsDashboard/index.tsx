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
                                <div className={'BondsDashboard_closedWrap'}>
                                    <Closed className={'BondsDashboard_closed'} />
                                </div>
                                <div className={'BondsDashboard_title'}>
                                    Maintenance
                                </div>
                                <div className={'BondsDashboard_content'}>
                                    Dear users!<br/><br/>
                                    Regarding switching Neutrino price oracles to 6 decimals some infrastructure elements still need to be updated.<br/><br/>
                                    NSBT auction interface is under construction, please don't hesitate to use Waves dApp (
                                    <a
                                        href="http://waves-dapp.com/"
                                        referrerPolicy="noopener noreferrer"
                                        target="_blank"
                                    >http://waves-dapp.com/</a>
                                    ) or Waves.Exchange (
                                    <a
                                        href="https://waves.exchange/investments/nsbt"
                                        referrerPolicy="noopener noreferrer"
                                        target="_blank"
                                    >https://waves.exchange/investments/nsbt</a>) NSBT interface to manage your assets.
                                    <br /><br />
                                    Thank you for understanding.
                                </div>
                                <div className={'BondsDashboard_btns'}>
                                    <Button className={'BondsDashboard_buttondApp'}
                                        type={'button'}
                                        onClick={this.goTodApp}
                                    >
                                        Go to Waves dApp
                                    </Button>
                                    <Button className={'BondsDashboard_buttonWExchange'}
                                        type={'button'}
                                        onClick={this.goToWavesExchange}
                                    >
                                        Go to Waves.Exchange
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Translation>
        );
    }

    goTodApp() {
        window.location.href = 'http://waves-dapp.com/';
    }
    goToWavesExchange() {
        window.location.href = 'https://waves.exchange/investments';
    }
}

export default connect((state) => ({
    user: getUser(state),
}))(BondsDashboard);
