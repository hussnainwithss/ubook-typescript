import React, { useContext } from 'react';
import { useAccordionToggle, AccordionContext, Card } from 'react-bootstrap';
import { StyledAccordian } from 'elements/ContextAwareToggle/style';
import { ContextAwareToggleProps } from 'elements/ContextAwareToggle/types';

const ContextAwareToggle: React.FC<ContextAwareToggleProps> = ({
    children,
    eventKey,
    callback,
}: ContextAwareToggleProps) => {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = currentEventKey === eventKey;
    return (
        <div>
            <StyledAccordian
                as={Card.Header}
                variant='link'
                iscurrenteventkey={isCurrentEventKey.toString()}
                onClick={decoratedOnClick}
            >
                {children}
            </StyledAccordian>
        </div>
    );
};

export default ContextAwareToggle;
