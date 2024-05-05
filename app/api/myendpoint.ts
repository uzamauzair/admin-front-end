import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import axios, { AxiosRequestConfig } from 'axios';

export default withApiAuthRequired(async function myEndpoint(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { accessToken } = await getAccessToken(req, res, { scopes: [] });

        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const baseURL = process.env.API_BASE_URL || 'http://localhost:3333';

        const config: AxiosRequestConfig = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };

        const response = await axios.post(baseURL + '/api/protected', {
            someThing: req.query.someThing,
            comment: 'string'
        }, config);

        res.status(response.status || 200).json(response.data);
    } catch (error: any) {
        console.error(error);
        res.status(error.response?.status || 500).json({
            code: error.code || 'unknown_error',
            error: error.message || 'Unknown error occurred'
        });
    }
});
