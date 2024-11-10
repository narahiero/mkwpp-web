/* tslint:disable */
/* eslint-disable */
/**
 * Mario Kart Wii Players\' Page API
 * The brains of the Mario Kart Wii Players\' Page.
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { TopScoreCountEnum } from './TopScoreCountEnum';
import {
    TopScoreCountEnumFromJSON,
    TopScoreCountEnumFromJSONTyped,
    TopScoreCountEnumToJSON,
} from './TopScoreCountEnum';
import type { CategoryEnum } from './CategoryEnum';
import {
    CategoryEnumFromJSON,
    CategoryEnumFromJSONTyped,
    CategoryEnumToJSON,
} from './CategoryEnum';
import type { Region } from './Region';
import {
    RegionFromJSON,
    RegionFromJSONTyped,
    RegionToJSON,
} from './Region';

/**
 * 
 * @export
 * @interface RegionStats
 */
export interface RegionStats {
    /**
     * 
     * @type {Region}
     * @memberof RegionStats
     */
    region: Region;
    /**
     * 
     * @type {TopScoreCountEnum}
     * @memberof RegionStats
     */
    topScoreCount: TopScoreCountEnum;
    /**
     * 
     * @type {CategoryEnum}
     * @memberof RegionStats
     */
    category: CategoryEnum;
    /**
     * OFF for course, ON for lap, and null for both
     * @type {boolean}
     * @memberof RegionStats
     */
    isLap?: boolean | null;
    /**
     * 
     * @type {number}
     * @memberof RegionStats
     */
    rank: number;
    /**
     * Number of track-lap combination with enough scores to qualify
     * @type {number}
     * @memberof RegionStats
     */
    participationCount: number;
    /**
     * Number of scores qualifying for the category
     * @type {number}
     * @memberof RegionStats
     */
    scoreCount: number;
    /**
     * Sum of all lowest scores
     * @type {number}
     * @memberof RegionStats
     */
    totalScore: number;
    /**
     * Sum of the rank of all lowest scores
     * @type {number}
     * @memberof RegionStats
     */
    totalRank: number;
    /**
     * 
     * @type {string}
     * @memberof RegionStats
     */
    readonly averageRank: string;
    /**
     * Sum of the standard of all lowest scores
     * @type {number}
     * @memberof RegionStats
     */
    totalStandard: number;
    /**
     * 
     * @type {string}
     * @memberof RegionStats
     */
    readonly averageStandard: string;
    /**
     * Sum of lowest score to record ratios
     * @type {number}
     * @memberof RegionStats
     */
    totalRecordRatio: number;
    /**
     * 
     * @type {string}
     * @memberof RegionStats
     */
    readonly averageRecordRatio: string;
    /**
     * Number of records
     * @type {number}
     * @memberof RegionStats
     */
    totalRecords: number;
}



/**
 * Check if a given object implements the RegionStats interface.
 */
export function instanceOfRegionStats(value: object): value is RegionStats {
    if (!('region' in value) || value['region'] === undefined) return false;
    if (!('topScoreCount' in value) || value['topScoreCount'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('rank' in value) || value['rank'] === undefined) return false;
    if (!('participationCount' in value) || value['participationCount'] === undefined) return false;
    if (!('scoreCount' in value) || value['scoreCount'] === undefined) return false;
    if (!('totalScore' in value) || value['totalScore'] === undefined) return false;
    if (!('totalRank' in value) || value['totalRank'] === undefined) return false;
    if (!('averageRank' in value) || value['averageRank'] === undefined) return false;
    if (!('totalStandard' in value) || value['totalStandard'] === undefined) return false;
    if (!('averageStandard' in value) || value['averageStandard'] === undefined) return false;
    if (!('totalRecordRatio' in value) || value['totalRecordRatio'] === undefined) return false;
    if (!('averageRecordRatio' in value) || value['averageRecordRatio'] === undefined) return false;
    if (!('totalRecords' in value) || value['totalRecords'] === undefined) return false;
    return true;
}

export function RegionStatsFromJSON(json: any): RegionStats {
    return RegionStatsFromJSONTyped(json, false);
}

export function RegionStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegionStats {
    if (json == null) {
        return json;
    }
    return {
        
        'region': RegionFromJSON(json['region']),
        'topScoreCount': TopScoreCountEnumFromJSON(json['top_score_count']),
        'category': CategoryEnumFromJSON(json['category']),
        'isLap': json['is_lap'] == null ? undefined : json['is_lap'],
        'rank': json['rank'],
        'participationCount': json['participation_count'],
        'scoreCount': json['score_count'],
        'totalScore': json['total_score'],
        'totalRank': json['total_rank'],
        'averageRank': json['average_rank'],
        'totalStandard': json['total_standard'],
        'averageStandard': json['average_standard'],
        'totalRecordRatio': json['total_record_ratio'],
        'averageRecordRatio': json['average_record_ratio'],
        'totalRecords': json['total_records'],
    };
}

export function RegionStatsToJSON(value?: Omit<RegionStats, 'average_rank'|'average_standard'|'average_record_ratio'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'region': RegionToJSON(value['region']),
        'top_score_count': TopScoreCountEnumToJSON(value['topScoreCount']),
        'category': CategoryEnumToJSON(value['category']),
        'is_lap': value['isLap'],
        'rank': value['rank'],
        'participation_count': value['participationCount'],
        'score_count': value['scoreCount'],
        'total_score': value['totalScore'],
        'total_rank': value['totalRank'],
        'total_standard': value['totalStandard'],
        'total_record_ratio': value['totalRecordRatio'],
        'total_records': value['totalRecords'],
    };
}

