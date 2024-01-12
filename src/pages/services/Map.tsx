import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Swipe, RSImagery, Xylophilus, QuarterlyChart, Introduction } from './services-routers';

const MapRoutes: React.FC = () => (
    <Routes>
        <Route path='/swipe' element={<Swipe />} />
        <Route path='/rsimagery' element={<RSImagery />} />
        <Route path='/xylophilus' element={<Xylophilus />} />
        <Route path='/ndvitemp' element={<QuarterlyChart />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/' element={<Navigate replace to="/introduction" />} />
    </Routes>
);

export default MapRoutes;